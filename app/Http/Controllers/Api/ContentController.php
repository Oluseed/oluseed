<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteContent;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContentController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        return response()->json(SiteContent::current($request->query('locale'))->data);
    }

    /**
     * Replace the whole content document for a language (used by JSON import).
     */
    public function update(Request $request): JsonResponse
    {
        $data = $request->json()->all();

        if (! is_array($data) || array_is_list($data) || ! isset($data['brand'])) {
            return response()->json(['error' => 'Invalid content'], 400);
        }

        SiteContent::current($request->query('locale'))->update(['data' => $data]);

        return response()->json(['ok' => true]);
    }

    /**
     * Replace a single top-level section, e.g. "projects" or "faq".
     */
    public function updateSection(Request $request, string $section): JsonResponse
    {
        $content = SiteContent::current($request->query('locale'));

        if (! array_key_exists($section, $content->data)) {
            return response()->json(['error' => 'Unknown section'], 404);
        }

        $content->updateSection($section, $request->json()->all());

        return response()->json(['ok' => true, 'content' => $content->fresh()->data]);
    }

    public function reset(Request $request): JsonResponse
    {
        $content = SiteContent::current($request->query('locale'))->resetToDefaults();

        return response()->json(['ok' => true, 'content' => $content->data]);
    }
}
