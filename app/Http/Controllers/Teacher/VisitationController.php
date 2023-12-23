<?php

namespace App\Http\Controllers\Teacher;

use App\Repositories\AssessmentAnswerRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScoreRepository;
use App\Repositories\ComponentDetailRepository;
use App\Repositories\ComponentRepository;
use App\Repositories\UserRepository;
use App\Services\Teachers\VisitationService;
use App\Services\TokenService;
use Illuminate\Http\Request;
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
        $assessmentScoreRepository = new AssessmentScoreRepository();
        $componentDetailRepository = new ComponentDetailRepository();
        $componentRepository = new ComponentRepository();
        $assessmentAnswer = new AssessmentAnswerRepository();

        $this->visitationService = new VisitationService(
            $assessmentRepository,
            $tokenService,
            $userRepository,
            $componentRepository,
            $componentDetailRepository,
            $assessmentScoreRepository,
            $assessmentAnswer
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

    public function answer(Request $request, string $assessmentId): \Illuminate\Http\JsonResponse
    {
        $link = $request->input("link");

        try {
            $data = $this->visitationService->create_answer($link, $assessmentId);
            return response()->json([
                'status' => true,
                'message' => 'successfully upload',
                'data' => $data
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
