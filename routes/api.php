<?php

use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\OverviewController;
use App\Http\Controllers\Api\SubscriberController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public endpoints
|--------------------------------------------------------------------------
*/

Route::get('content', [ContentController::class, 'show']);

Route::middleware('throttle:20,1')->group(function () {
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('applications', [ApplicationController::class, 'store']);
    Route::post('messages', [ContactMessageController::class, 'store']);
    Route::post('subscribers', [SubscriberController::class, 'store']);
    Route::post('upload/cv', [UploadController::class, 'cv']);
});

/*
|--------------------------------------------------------------------------
| Admin endpoints (Sanctum bearer token)
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('auth/me', [AuthController::class, 'me']);
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::put('content', [ContentController::class, 'update']);
    Route::post('content/reset', [ContentController::class, 'reset']);
    Route::patch('content/{section}', [ContentController::class, 'updateSection'])->where('section', '[a-zA-Z]+');

    Route::post('upload', [UploadController::class, 'image']);

    Route::get('applications', [ApplicationController::class, 'index']);
    Route::patch('applications/{application}', [ApplicationController::class, 'update']);
    Route::delete('applications/{application}', [ApplicationController::class, 'destroy']);

    Route::get('messages', [ContactMessageController::class, 'index']);
    Route::patch('messages/{message}', [ContactMessageController::class, 'update']);
    Route::delete('messages/{message}', [ContactMessageController::class, 'destroy']);

    Route::get('subscribers', [SubscriberController::class, 'index']);
    Route::delete('subscribers/{subscriber}', [SubscriberController::class, 'destroy']);

    Route::get('admin/overview', OverviewController::class);
});
