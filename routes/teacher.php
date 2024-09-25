<?php
use Illuminate\Support\Facades\Route;

Route::get("report", [\App\Http\Controllers\Teacher\ReportController::class, "index"])->name("report.teacher");


Route::middleware(["cekCookie"])->group(function () {
    Route::middleware(["role:Teacher"])->group(function () {


        Route::prefix("teachers")->group(function () {

            Route::get("dashboard", [\App\Http\Controllers\Teacher\DashboardController::class, "index"])->name("dashboard.teacher");

            Route::get("profile", [\App\Http\Controllers\Teacher\ProfileController::class, "index"])->name("teachers.profile.index");
            Route::post("profile/avatar", [\App\Http\Controllers\Teacher\ProfileController::class, "avatar"])->name("teachers.avatar");
            Route::put("profile/account/password", [\App\Http\Controllers\Teacher\ProfileController::class, "change_password"])->name("teachers.password");
            Route::put("profile/account", [\App\Http\Controllers\Teacher\ProfileController::class, "bio"]);


            Route::prefix("visitation")->group(function () {
                Route::get("/", [\App\Http\Controllers\Teacher\VisitationController::class, 'index'])->name("teacher.visitation.index");
                Route::get("{id}", [\App\Http\Controllers\Teacher\VisitationController::class, 'show'])->name("teacher.visitation.show");
                Route::post("{id}/answer", [\App\Http\Controllers\Teacher\VisitationController::class, 'answer'])->name("teacher.visitation.answer");
            });
        });

    });
});

