<?php

namespace App\Http\Controllers\Teacher;

use App\Repositories\AssessmentRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use App\Services\Teachers\VisitationService;
use App\Services\TokenService;
use Inertia\Inertia;

class VisitationController
{
    private VisitationService $visitationService;

    public function __construct()
    {
        $assessmentRepository = new AssessmentRepository();
        $schoolRepository = new SchoolRepository();
        $tokenService = new TokenService();
        $userRepository = new UserRepository();
        $this->visitationService = new VisitationService($assessmentRepository, $schoolRepository, $tokenService, $userRepository);
    }

    public function index(): \Inertia\Response
    {
        $assessments = $this->visitationService->getAssessments();

        return Inertia::render("Teachers/Visitation/Page", [
            "assessments" => $assessments
        ]);
    }

    public function show(string $id)
    {
        dd($id);
    }
}
