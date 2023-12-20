<?php

namespace App\Http\Controllers;

use App\DTO\CreateAssessmentDTO;
use App\DTO\SetUpDateDTO;
use App\Http\Requests\CreateAssessmentRequest;
use App\Http\Requests\SetUpDateRequest;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScheduleRepository;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\InstrumentCriteriaRepository;
use App\Repositories\InstrumentRepository;
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
        $assessmentStageRepository = new AssessmentStageRepository();
        $instrumentRepository = new InstrumentRepository();
        $scheduleRepository = new AssessmentScheduleRepository();
        $instrumentCriteriaRepository = new InstrumentCriteriaRepository();

        $this->visitationService = new VisitationService(
            $academicRepository,
            $schoolRepository,
            $tokenService,
            $assessmentRepository,
            $userRepository,
            $assessmentStageRepository,
            $instrumentRepository,
            $scheduleRepository,
            $instrumentCriteriaRepository
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
            abort(404, "Data filter tidak ditemukan!");
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
        $validated = $request->validationData();

        $dto = new CreateAssessmentDTO();
        $dto->teacherId = $validated['teacher_id'];
        $dto->academicYear = $validated['year'];
        $dto->academicSemester = $validated['semester'];
        $dto->dateStart = $validated['dateForm']['date_start'];
        $dto->timeStart = $validated['dateForm']['time_start'];
        $dto->dateEnd = $validated['dateForm']['date_end'];
        $dto->timeEnd = $validated['dateForm']['time_end'];

        try {
            $response = $this->visitationService->create($dto);
            return response()->json([
                'status' => true,
                'message' => 'Visitation successfully created',
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

    public function destroy(string $id): JsonResponse
    {
        try {
             $this->visitationService->delete($id);
            return response()->json([
                'status' => true,
                'message' => 'Assessment teacher successfully deleted',
                'data' => []
            ], 200);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }

    public function detail(string $assessment_id)
    {

        try {
            $response = $this->visitationService->getById($assessment_id);
            return Inertia::render("Visitation/Detail", [
               "data" => $response
           ]);
        }catch (Exception $exception)
        {
            abort(404, $exception->getMessage());
        }
    }

    public function store_date(SetUpDateRequest $request, $assessment_id, $instrument_id): JsonResponse
    {
        $data = $request->validationData();

        $dto = new SetUpDateDTO();
        $dto->assessmentId  = $assessment_id;
        $dto->stageName     = $data["stageName"];
        $dto->instrumentId  = $instrument_id;
        $dto->dateStart     = $data["date_start"];
        $dto->timeStart     = $data["time_start"];
        $dto->dateEnd       = $data["date_end"];
        $dto->timeEnd       = $data["time_end"];

        try {
            $this->visitationService->setting_date($dto);
            return response()->json([
                'status' => true,
                'message' => 'successfully setup date',
                'data' => []
            ], 200);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }

    public function update_date(SetUpDateRequest $request, string $assessment_id): JsonResponse
    {
        $data = $request->validationData();

        $dto = new SetUpDateDTO();
        $dto->assessmentId  = $assessment_id;
        $dto->dateStart     = $data["date_start"];
        $dto->timeStart     = $data["time_start"];
        $dto->dateEnd       = $data["date_end"];
        $dto->timeEnd       = $data["time_end"];

        try {
            $this->visitationService->update_date($dto);
            return response()->json([
                'status' => true,
                'message' => 'successfully updated date',
                'data' => []
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function reset_date(string $id): JsonResponse
    {
        try {
            $this->visitationService->reset_schedule($id);
            return response()->json([
                'status' => true,
                'message' => 'successfully reset',
                'data' => []
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function instrument_items(string $assessment_id, string $id): JsonResponse
    {
        try {
            $data = $this->visitationService->instrument_criteria($assessment_id, $id);
            return response()->json([
                'status' => true,
                'message' => 'successfully get data',
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
