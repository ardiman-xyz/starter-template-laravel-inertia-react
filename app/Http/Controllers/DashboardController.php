<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\SchoolRepository;
use App\Services\DashboardService;
use App\Services\TokenService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{

    private DashboardService $dashboardService;
    private TokenService $tokenService;

    public function __construct()
    {
        $this->tokenService = new TokenService();
        $schoolRepository =  new SchoolRepository();
        $this->dashboardService = new DashboardService($schoolRepository, $this->tokenService);
    }

    public function index(): Response
    {

        $trendVisitation = $this->dashboardService->getTrendVisitationTeacher();
        $categories = $this->dashboardService->getCategoryDistribution();
        $averages = $this->getAverages();

        return Inertia::render('Dashboard', [
            'trendVisitation' => $trendVisitation,
            'categories' => $categories,
            'averages' => $averages
        ]);
    }


    private function getAverages()
    {

        $currentUser = $this->tokenService->currentUser();

        if(!$currentUser)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }

        $user = User::find($currentUser->id);


        $averages = DB::table('assessments as a')
                ->join('academic_semesters as sem', 'a.academic_semester_id', '=', 'sem.id')
                ->join('assessment_scores as scores', 'a.id', '=', 'scores.assessment_id')
                ->select(
                    'sem.academic_year',
                    'sem.semester',
                    DB::raw('AVG(scores.score) as average_score'), 
                    DB::raw('COUNT(DISTINCT a.id) as total_supervisi')
                )
                ->where("a.school_id", $user->school->id)
                ->groupBy('sem.academic_year', 'sem.semester')
                ->orderBy('sem.academic_year')
                ->orderBy('sem.semester')
                ->get()
                ->map(function($item) {
                    return [
                        'academic_year' => $item->academic_year,
                        'semester' => $item->semester,
                        'average_score' => round(($item->average_score / 4) * 100, 2),
                        'total_supervisi' => $item->total_supervisi
                    ];
                });
        return $averages;
    }
}
