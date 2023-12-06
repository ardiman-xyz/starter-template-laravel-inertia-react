<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SchoolController extends Controller
{
    public function create()
    {
        return Inertia::render("School/Create");
    }
}
