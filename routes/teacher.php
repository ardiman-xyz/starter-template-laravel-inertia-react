<?php
use Illuminate\Support\Facades\Route;

Route::middleware(["cekCookie"])->group(function () {
    Route::middleware(["role:Teacher"])->group(function () {

        Route::prefix("teachers")->group(function () {
            Route::get("profile", [\App\Http\Controllers\Teacher\ProfileController::class, "index"])->name("teachers.profile.index");
            Route::post("profile/avatar", [\App\Http\Controllers\Teacher\ProfileController::class, "avatar"])->name("teachers.avatar");
            Route::put("profile/account/password", [\App\Http\Controllers\Teacher\ProfileController::class, "change_password"])->name("teachers.password");
            Route::put("profile/account", [\App\Http\Controllers\Teacher\ProfileController::class, "bio"]);
        });

    });
});

