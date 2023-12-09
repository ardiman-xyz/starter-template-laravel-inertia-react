<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VisitationController extends Controller
{
    public function index(): \Inertia\Response
    {
        return Inertia::render("Visitation/Index");
    }

    public function filter(string $academic_year_id): \Inertia\Response
    {
        return Inertia::render("Visitation/Filter");
    }
}
