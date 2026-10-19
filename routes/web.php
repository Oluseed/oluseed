<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Single-page application
|--------------------------------------------------------------------------
|
| Every non-API route renders the React app, which handles routing on the
| client (public pages and the /admin area).
|
*/

Route::view('/{any?}', 'app')
    ->where('any', '^(?!api/|storage/|build/).*$')
    ->name('spa');
