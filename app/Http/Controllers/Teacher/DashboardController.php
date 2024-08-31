<?php

namespace App\Http\Controllers\Teacher;

use App\Repositories\SchoolRepository;
use App\Services\Teachers\DashboardService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaView;

class DashboardController
{

    private DashboardService $service;
    private TokenService $login;

    public function __construct(){
        $tokenService = new TokenService();
        $schoolRepository =  new SchoolRepository();
        $this->service =  new DashboardService( $schoolRepository, $tokenService,);
        $this->login = new TokenService();
    }

    public function index()
    {

        $user = $this->login->currentUser();
        

        $trendVisitation = $this->service->getTrendVisitationTeacher($user->id);
        $categories = $this->service->getCategoryDistribution($user->id);

        return Inertia::render('Teachers/Dashboard', [
            'trendVisitation' => $trendVisitation,
            'categories' => $categories
        ]);
    }
}
