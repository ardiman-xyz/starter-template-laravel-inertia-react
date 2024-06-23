<?php

namespace App\Http\Controllers;

use App\Repositories\SchoolRepository;
use App\Services\DashboardService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{

    private DashboardService $dashboardService;

    public function __construct()
    {
        $tokenService = new TokenService();
        $schoolRepository =  new SchoolRepository();
        $this->dashboardService = new DashboardService($schoolRepository, $tokenService);
    }

    public function index(): Response
    {

        $trendVisitation = $this->dashboardService->getTrendVisitationTeacher();
        $categories = $this->dashboardService->getCategoryDistribution();

        return Inertia::render('Dashboard', [
            'trendVisitation' => $trendVisitation,
            'categories' => $categories
        ]);
    }
}
