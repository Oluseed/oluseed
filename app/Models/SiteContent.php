<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class SiteContent extends Model
{
    protected $fillable = ['locale', 'data'];

    /**
     * Lists inside the content document whose items are keyed by `id` and
     * must exist in every language. Text fields stay per-language; the
     * fields listed here are mirrored from the language being saved.
     *
     * @var array<string, string[]>
     */
    public const SYNCED_LISTS = [
        'projects' => ['image', 'link', 'featured', 'category', 'tag'],
        'careers.jobs' => ['open'],
        'internships.items' => ['open', 'deadline'],
        'shop.products' => ['image', 'price', 'inStock'],
        'blog.posts' => ['image', 'day', 'month', 'year', 'author'],
    ];

    protected function casts(): array
    {
        return [
            'data' => 'array',
        ];
    }

    public static function locales(): array
    {
        return config('oluseed.locales', ['en']);
    }

    public static function normalizeLocale(?string $locale): string
    {
        $locale = strtolower((string) $locale);

        return in_array($locale, static::locales(), true) ? $locale : static::locales()[0];
    }

    /**
     * The content row for a language, created from the bundled defaults on first use.
     */
    public static function current(?string $locale = null): self
    {
        $locale = static::normalizeLocale($locale);

        $content = static::firstOrCreate(['locale' => $locale], ['data' => static::defaults($locale)]);

        // Sections added in newer releases are filled in from the defaults.
        $missing = array_diff_key(static::defaults($locale), $content->data);
        if ($missing !== []) {
            $content->update(['data' => $content->data + $missing]);
        }

        return $content;
    }

    /**
     * Default content shipped with the front end for a language,
     * falling back to the primary language file.
     */
    public static function defaults(?string $locale = null): array
    {
        $locale = static::normalizeLocale($locale);
        $base = config('oluseed.default_content_path');
        $localized = preg_replace('/\.json$/', ".{$locale}.json", $base);
        $path = $locale !== static::locales()[0] && File::exists($localized) ? $localized : $base;

        return json_decode(File::get($path), true, 512, JSON_THROW_ON_ERROR);
    }

    public function resetToDefaults(): self
    {
        $this->update(['data' => static::defaults($this->locale)]);

        return $this;
    }

    public function updateSection(string $section, mixed $value): self
    {
        $data = $this->data;
        $data[$section] = $value;
        $this->update(['data' => $data]);

        $this->syncStructureToOtherLocales($section);

        return $this;
    }

    /**
     * Keep id-keyed lists (projects, jobs, products, posts) aligned across
     * languages: items added/removed/reordered here are added/removed/
     * reordered everywhere, while translated text in other languages is kept.
     */
    public function syncStructureToOtherLocales(string $section): void
    {
        foreach (static::SYNCED_LISTS as $path => $mirrored) {
            if (! str_starts_with($path, $section)) {
                continue;
            }

            $source = data_get($this->data, $path);
            if (! is_array($source)) {
                continue;
            }

            foreach (static::locales() as $locale) {
                if ($locale === $this->locale) {
                    continue;
                }

                $other = static::current($locale);
                $data = $other->data;
                $existing = collect(data_get($data, $path, []))->keyBy('id');

                $merged = collect($source)->map(function (array $item) use ($existing, $mirrored) {
                    $current = $existing->get($item['id'] ?? null);
                    if (! is_array($current)) {
                        return $item;
                    }
                    foreach ($mirrored as $field) {
                        if (array_key_exists($field, $item)) {
                            $current[$field] = $item[$field];
                        }
                    }

                    return $current;
                })->values()->all();

                data_set($data, $path, $merged);
                $other->update(['data' => $data]);
            }
        }
    }
}
