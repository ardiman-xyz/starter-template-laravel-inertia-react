<?php

use App\Http\Controllers\AcademicSemesterController;
use Illuminate\Support\Facades\Route;

Route::middleware(["cekCookie"])->group(function () {
    Route::middleware(["role:Headmaster"])->group(function () {

        Route::prefix("visitation")->group(function () {
            Route::get("/", [\App\Http\Controllers\VisitationController::class, "index"])->name("visitation.index");
            Route::get("filter", [\App\Http\Controllers\VisitationController::class, "filter"])->name("visitation.filter");
            Route::get("teachers", [\App\Http\Controllers\VisitationController::class, "teacher"]);
            Route::post("teacher/attach", [\App\Http\Controllers\VisitationController::class, "attach"]);
            Route::delete("teacher/{id}", [\App\Http\Controllers\VisitationController::class, "destroy"]);

            Route::get("{assessment_id}", [\App\Http\Controllers\VisitationController::class, "detail"])->name("visitation.detail");

            Route::post("{assessment_id}/date/{instrument_id}", [\App\Http\Controllers\VisitationController::class, "store_date"]);
            Route::put("{assessment_id}/date", [\App\Http\Controllers\VisitationController::class, "update_date"]);
            Route::delete("date/{id}", [\App\Http\Controllers\VisitationController::class, "reset_date"]);
            Route::get("{assessment_id}/instrument/{id}/items", [\App\Http\Controllers\VisitationController::class, "instrument_items"]);

            Route::post("{assessment_id}/score", [\App\Http\Controllers\VisitationController::class, "score"]);
            Route::put("{assessment_id}/analysis", [\App\Http\Controllers\VisitationController::class, "analysis"]);
            Route::put("{assessment_id}/finish", [\App\Http\Controllers\VisitationController::class, "finish"]);

            // video tracking
            Route::post("video/progress", [\App\Http\Controllers\VisitationController::class, "updateProgress"])->name("visitation.video-progress");
        });

        Route::prefix("academic-semester")->group(function () {
            Route::get("/", [AcademicSemesterController::class, "index"])->name("academic_year.index");
            Route::post("/", [AcademicSemesterController::class, "store"])->name("academic_year.store");
            Route::put("{id}/update", [AcademicSemesterController::class, "update"])->name("academic_year.update");
            Route::delete("{id}", [AcademicSemesterController::class, "destroy"])->name("academic_year.destroy");
        });

        Route::prefix("calendar")->group(function () {
            Route::get("/", [\App\Http\Controllers\CalendarController::class, "index"])->name("calendar.index");
            Route::get("upcoming", [\App\Http\Controllers\CalendarController::class, "getUpcomingSupervisi"])->name("supervisi.calendar.upcoming");
        });
    });
});


