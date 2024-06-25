<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WebController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Welcome', []);
    }
}
