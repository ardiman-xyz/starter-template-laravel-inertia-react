<?php

namespace App\Http\Controllers\Teacher;

use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScheduleRepository;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\InstrumentRepository;
use App\Repositories\UserRepository;
use App\Services\Teachers\VisitationService;
use App\Services\TokenService;
use Inertia\Inertia;
use Exception;

class VisitationController
{
    private VisitationService $visitationService;

    public function __construct()
    {
        $tokenService = new TokenService();
        $assessmentRepository = new AssessmentRepository();
        $userRepository = new UserRepository();
        $assessmentStageRepository = new AssessmentStageRepository();
        $instrumentRepository = new InstrumentRepository();
        $scheduleRepository = new AssessmentScheduleRepository();

        $this->visitationService = new VisitationService(
            $assessmentRepository,
            $tokenService,
            $assessmentStageRepository,
            $userRepository,
            $instrumentRepository,
            $scheduleRepository,
        );
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
        try {
            $response = $this->visitationService->getById($id);
            return Inertia::render("Teachers/Visitation/Detail", [
                "data" => $response
            ]);
        }catch (Exception $exception)
        {
            abort(404, $exception->getMessage());
        }
    }
}
