<?php

namespace App\Http\Controllers;

use App\DTO\CreateAssessmentDTO;
use App\Http\Requests\CreateAssessmentRequest;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use App\Services\TokenService;
use App\Services\VisitationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class VisitationController extends Controller
{
    private VisitationService $visitationService;

    public function __construct()
    {
        $academicRepository = new AcademicSemesterRepository();
        $schoolRepository = new SchoolRepository();
        $tokenService = new TokenService();
        $assessmentRepository = new AssessmentRepository();
        $userRepository = new UserRepository();
        $this->visitationService = new VisitationService(
            $academicRepository,
            $schoolRepository,
            $tokenService,
            $assessmentRepository,
            $userRepository
        );
    }

    public function index(): \Inertia\Response
    {
        $data = $this->visitationService->getAcademicSemester();
        return Inertia::render("Visitation/Index", [
            "academic_year" => $data
        ]);
    }

    public function filter(Request $request)
    {
        $year = $request->query('year');
        $semester = $request->query('smt');

        if(!$year || !$semester) {
            abort("404");
        }

        try {

            $data = $this->visitationService->getFilterByAcademicSemester($year, $semester);

            return Inertia::render("Visitation/Filter", [
                "data"  => $data,
                "year"  => $year,
                "semester" => $semester
            ]);

        }catch (Exception $exception)
        {
            return "not okay";
        }

    }

    public function teacher(): JsonResponse
    {
        $teachers = $this->visitationService->getTeachersBySchoolId();

        return response()->json([
            'success' => true,
            'message' => 'Successfully get data',
            'teachers' => $teachers

        ], 201);
    }

    public function attach(CreateAssessmentRequest $request): JsonResponse
    {
        $data = $request->validationData();

        $teacherId = $data["teacher_id"];
        $year =  $data["year"];
        $semester =  $data["semester"];

        $dto = new CreateAssessmentDTO();
        $dto->teacherId = $teacherId;
        $dto->academicYear = $year;
        $dto->academicSemester = $semester;

        try {
            $response = $this->visitationService->create($dto);
            return response()->json([
                'status' => true,
                'message' => 'Teacher successfully created',
                'data' => $response
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }
}
