<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::prefix("auth")->middleware("guest")->group(function () {
    Route::get("/", [\App\Http\Controllers\Auth\Social\AuthController::class, 'create'])->name("social.auth.google");
    Route::get("social/redirect", [\App\Http\Controllers\Auth\Social\AuthController::class, 'redirect'])->name("social.auth.redirect");
    Route::get("social/callback", [\App\Http\Controllers\Auth\Social\AuthController::class, 'callback'])->name("social.auth.callback");
    Route::post("login", [\App\Http\Controllers\Auth\Social\AuthController::class, "login"]);
    Route::post("register", [\App\Http\Controllers\Auth\Social\AuthController::class, "register"]);
});


Route::middleware("cekCookie")->group(function () {
   Route::get("/dashboard", [\App\Http\Controllers\DashboardController::class, "index"])->name("dashboard")->middleware("schoolData");

   Route::prefix("school")->group(function () {
      Route::get("new", [\App\Http\Controllers\SchoolController::class, "create"])->name("school.create");
   });
});

Route::get('/logout', function () {
    Cookie::queue(Cookie::forget('vistoken'));
    return redirect('/auth');
})->name('logout');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix("/roles")->group(function () {
        Route::get("/", [\App\Http\Controllers\RoleController::class, 'index']);
        Route::post("/", [\App\Http\Controllers\RoleController::class, 'create']);
        Route::delete("{id}", [\App\Http\Controllers\RoleController::class, 'destroy']);
        Route::put("{id}", [\App\Http\Controllers\RoleController::class, 'update']);
    });

    Route::prefix("/users")->group(function () {
        Route::get("/", [\App\Http\Controllers\UserController::class, 'index']);
        Route::post("/", [\App\Http\Controllers\UserController::class, 'store']);
        Route::delete("{id}", [\App\Http\Controllers\UserController::class, 'destroy']);
        Route::put("{id}", [\App\Http\Controllers\UserController::class, 'update']);
    });

});


//require __DIR__.'/auth.php';
