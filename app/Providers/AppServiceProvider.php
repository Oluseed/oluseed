<?php

namespace App\Providers;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        // The React front end expects plain arrays/objects, not { data: ... } envelopes.
        JsonResource::withoutWrapping();
    }
}
