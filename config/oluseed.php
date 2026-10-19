<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Admin credentials
    |--------------------------------------------------------------------------
    |
    | The account used to sign in to /admin. Set ADMIN_EMAIL and
    | ADMIN_PASSWORD in your .env file. The admin user is created (or its
    | password synced) from these values when you run `php artisan db:seed`
    | and again on the first successful login.
    |
    */

    'admin_email' => env('ADMIN_EMAIL', 'admin@admin.com'),

    'admin_password' => env('ADMIN_PASSWORD', 'admin123'),

    /*
    |--------------------------------------------------------------------------
    | Default site content
    |--------------------------------------------------------------------------
    |
    | Used to seed the site_contents table the first time the site runs and
    | when an admin resets the content to defaults. The same file is bundled
    | into the front end as an offline fallback.
    |
    */

    'default_content_path' => resource_path('js/content/default-content.json'),

    /*
    |--------------------------------------------------------------------------
    | Languages
    |--------------------------------------------------------------------------
    |
    | The first entry is the primary language. Each language has its own
    | content document; defaults come from default-content.{locale}.json
    | (falling back to default-content.json).
    |
    */

    'locales' => ['en', 'fr'],

    'uploads_disk' => env('UPLOADS_DISK', 'public'),

];
