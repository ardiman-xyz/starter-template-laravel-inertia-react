<?php

use App\Http\Controllers\Teacher\ReportController;
use App\Http\Controllers\Teacher\TeachingDeviceController;
use Illuminate\Support\Facades\Route;

Route::get("report", [\App\Http\Controllers\Teacher\ReportController::class, "preview"])->name("report.teacher");


Route::middleware(["cekCookie"])->group(function () {
    Route::middleware(["role:Teacher"])->group(function () {


        Route::prefix("teachers")->group(function () {

            Route::get("dashboard", [\App\Http\Controllers\Teacher\DashboardController::class, "index"])->name("dashboard.teacher");

            Route::get("profile", [\App\Http\Controllers\Teacher\ProfileController::class, "index"])->name("teachers.profile.index");
            Route::post("profile/avatar", [\App\Http\Controllers\Teacher\ProfileController::class, "avatar"])->name("teachers.avatar");
            Route::put("profile/account/password", [\App\Http\Controllers\Teacher\ProfileController::class, "change_password"])->name("teachers.password");
            Route::put("profile/account", [\App\Http\Controllers\Teacher\ProfileController::class, "bio"]);

            Route::get("instrument", [\App\Http\Controllers\Teacher\InstrumentController::class, "index"]);


            Route::prefix("visitation")->group(function () {
                Route::get("/", [\App\Http\Controllers\Teacher\VisitationController::class, 'index'])->name("teacher.visitation.index");
                Route::get("{id}", [\App\Http\Controllers\Teacher\VisitationController::class, 'show'])->name("teacher.visitation.show");
                Route::post("{id}/answer", [\App\Http\Controllers\Teacher\VisitationController::class, 'answer'])->name("teacher.visitation.answer");
            });


            // Teaching Device routes
            Route::get('/visitation/{assessmentId}/teaching-device', [TeachingDeviceController::class, 'show']);
            Route::post('/visitation/{assessmentId}/teaching-device/upload', [TeachingDeviceController::class, 'upload']);
            Route::delete('/visitation/{assessmentId}/teaching-device/remove', [TeachingDeviceController::class, 'remove']);

            Route::get("report/preview/{id}", [ReportController::class, "preview"])->name("teacher.report.preview");
        });

    });
});

