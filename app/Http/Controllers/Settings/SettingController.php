<?php

namespace App\Http\Controllers\Settings;

use Inertia\Inertia;
use Inertia\Response as InertiaView;

class SettingController
{
    public function index(): InertiaView
    {
        return Inertia::render('Settings/Index', []);
    }
}
