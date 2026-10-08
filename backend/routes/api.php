<?php

use App\Http\Controllers\Api\V1\InquiryController;
use App\Http\Controllers\Api\V1\ProjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API v1
|--------------------------------------------------------------------------
| Stateless, throttled, endpoints consumed by the Next.js frontend.
| The "api" prefix is applied in bootstrap/app.php; "v1" is added here.
*/

Route::prefix('v1')
    ->name('api.v1.')
    ->group(function () {
        Route::middleware('throttle:api')->group(function () {
            Route::get('projects', [ProjectController::class, 'index'])->name('projects.index');
            Route::get('projects/{project:slug}', [ProjectController::class, 'show'])->name('projects.show');
        });

        Route::middleware('throttle:inquiries')->group(function () {
            Route::post('inquiries', [InquiryController::class, 'store'])->name('inquiries.store');
        });
    });
