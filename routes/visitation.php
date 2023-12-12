<?php

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
        });

    });
});


