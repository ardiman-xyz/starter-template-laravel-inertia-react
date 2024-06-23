<?php

namespace App\Http\Controllers;

use App\Repositories\SchoolRepository;
use App\Services\DashboardService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{

    private DashboardService $dashboardService;

    public function __construct()
    {
        $tokenService = new TokenService();
        $schoolRepository =  new SchoolRepository();
        $this->dashboardService = new DashboardService($schoolRepository, $tokenService);
    }

    public function index()
    {

//        dd($this->dashboardService->getTrendVisitationTeacher());

        return Inertia::render('Dashboard');
    }
}
