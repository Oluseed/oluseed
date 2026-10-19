<?php

namespace Database\Seeders;

use App\Models\SiteContent;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin account from ADMIN_EMAIL / ADMIN_PASSWORD (password hash re-synced on every seed).
        User::admin(syncPassword: true);

        // Site content for every language from the bundled defaults (only if none exists yet).
        foreach (SiteContent::locales() as $locale) {
            SiteContent::current($locale);
        }
    }
}
