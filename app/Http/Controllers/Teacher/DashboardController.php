<?php

namespace App\Http\Controllers\Teacher;

use Inertia\Inertia;
use Inertia\Response as InertiaView;

class DashboardController
{
    public function index(): InertiaView
    {
        return Inertia::render('Teachers/Dashboard', []);
    }
}
