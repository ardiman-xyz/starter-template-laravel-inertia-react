<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Cookie;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get("invitation", [\App\Http\Controllers\InvitationController::class, "validateInvitation"]);
Route::post("invitations/reset-password", [\App\Http\Controllers\InvitationController::class, "resetPassword"]);

Route::prefix("auth")->middleware("guest")->group(function () {
    Route::get("/", [\App\Http\Controllers\Auth\Social\AuthController::class, 'create'])->name("social.auth.google");
    Route::get("social/redirect", [\App\Http\Controllers\Auth\Social\AuthController::class, 'redirect'])->name("social.auth.redirect");
    Route::get("social/callback", [\App\Http\Controllers\Auth\Social\AuthController::class, 'callback'])->name("social.auth.callback");
    Route::post("login", [\App\Http\Controllers\Auth\Social\AuthController::class, "login"]);
    Route::post("register", [\App\Http\Controllers\Auth\Social\AuthController::class, "register"]);
});


Route::middleware(["cekCookie"])->group(function () {
    Route::middleware(["role:Headmaster"])->group(function () {
        Route::get("/dashboard", [\App\Http\Controllers\DashboardController::class, "index"])->name("dashboard")->middleware("schoolData");

        Route::prefix("school")->group(function () {
            Route::get("new", [\App\Http\Controllers\SchoolController::class, "create"])->name("school.create");
            Route::post("/", [\App\Http\Controllers\SchoolController::class, "store"])->name("school.store");
        });

        Route::prefix("teacher")->group(function () {
            Route::get("/", [\App\Http\Controllers\TeacherController::class, "index"])->name("teacher.index");
            Route::post("/", [\App\Http\Controllers\TeacherController::class, "store"])->name("teacher.store");
            Route::get("invitations/{id}", [\App\Http\Controllers\TeacherController::class, "invitations"]);
            Route::put("{id}", [\App\Http\Controllers\TeacherController::class, "update"]);
            Route::delete("{id}", [\App\Http\Controllers\TeacherController::class, "destroy"]);
        });

        Route::prefix("instrumental")->group(function () {
            Route::get("/", [\App\Http\Controllers\InstrumentalController::class, "index"])->name("instrumental.index");
            Route::get("{step_id}/stage", [\App\Http\Controllers\InstrumentalController::class, "instrument"])->name("instrumental.stage");
            Route::post("{stage_id}/instrument", [\App\Http\Controllers\InstrumentalController::class, "store"]);
            Route::put("{instrument_id}/instrument", [\App\Http\Controllers\InstrumentalController::class, "update"]);
            Route::delete("{instrument_id}/instrument", [\App\Http\Controllers\InstrumentalController::class, "destroy"]);

            Route::get("{instrument_id}/instrument/criteria", [\App\Http\Controllers\InstrumentCriteriaController::class, "index"]);
            Route::post("{instrument_id}/instrument/criteria", [\App\Http\Controllers\InstrumentCriteriaController::class, "store"]);
            Route::put("instrument/criteria", [\App\Http\Controllers\InstrumentCriteriaController::class, "update"]);
            Route::delete("instrument/criteria/{id}", [\App\Http\Controllers\InstrumentCriteriaController::class, "destroy"]);
        });

        Route::prefix("instruments")->group(function () {
            Route::get("/", [\App\Http\Controllers\InstrumentController::class, "index"])->name("instrument.index");
            Route::post("/", [\App\Http\Controllers\InstrumentController::class, "store"]);
            Route::get("{id}", [\App\Http\Controllers\InstrumentController::class, "show"])->name("instrument.detail");
            Route::post("{instrument_id}/item", [\App\Http\Controllers\InstrumentItemController::class, "store"]);
            Route::put("{id}/item", [\App\Http\Controllers\InstrumentItemController::class, "edit"]);
            Route::delete("{id}/item", [\App\Http\Controllers\InstrumentItemController::class, "destroy"]);
        });
    });

    Route::middleware(["role:Teacher"])->group(function () {
        Route::prefix("teacher")->group(function () {
            Route::get("dashboard", [\App\Http\Controllers\DashboardController::class, "index"])->name("dashboard.teacher");
        });
    });
});


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


Route::get('/logout', function () {
    Cookie::queue(Cookie::forget('vistoken'));
    return redirect('/auth');
})->name('logout');


//require __DIR__.'/auth.php';
require __DIR__.'/visitation.php';
require __DIR__.'/teacher.php';
