<?php

use Illuminate\Support\Facades\Route;

Route::middleware(["cekCookie"])->group(function () {
    Route::middleware(["role:Headmaster"])->group(function () {

        Route::prefix("visitation")->group(function () {
            Route::get("/", [\App\Http\Controllers\VisitationController::class, "index"]);
            Route::get("filter/{academic_year_id}", [\App\Http\Controllers\VisitationController::class, "filter"])->name("visitation.filter");
        });

    });
});


