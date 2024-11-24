<?php

namespace App\Http\Controllers;

use App\DTO\AnalysisUpdateDTO;
use App\DTO\CreateAssessmentDTO;
use App\DTO\ScoredAssessmentDTO;
use App\DTO\SetUpDateDTO;
use App\Http\Requests\CreateAssessmentRequest;
use App\Http\Requests\SetUpDateRequest;
use App\Http\Requests\StoreScoreRequest;
use App\Http\Requests\UpdateAnalysisRequest;
use App\Models\AssessmentAnswer;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\AssessmentAnswerRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScheduleRepository;
use App\Repositories\AssessmentScoreRepository;
use App\Repositories\ComponentDetailRepository;
use App\Repositories\ComponentRepository;
use App\Repositories\InstrumentCriteriaRepository;
use App\Repositories\InstrumentRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use App\Services\TokenService;
use App\Services\UserService;
use App\Services\VisitationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class VisitationController extends Controller
{
    private VisitationService $visitationService;
    private TokenService $tokenService;
    private UserService $userService;

    public function __construct()
    {
        $academicRepository = new AcademicSemesterRepository();
        $schoolRepository = new SchoolRepository();
        $tokenService = new TokenService();
        $assessmentRepository = new AssessmentRepository();
        $userRepository = new UserRepository();
        $instrumentRepository = new InstrumentRepository();
        $scheduleRepository = new AssessmentScheduleRepository();
        $instrumentCriteriaRepository = new InstrumentCriteriaRepository();
        $componentRepository = new ComponentRepository();
        $componentDetailRepository = new ComponentDetailRepository();
        $assessmentAnswerRepository = new AssessmentAnswerRepository();
        $assessmentScoreRepository = new AssessmentScoreRepository();

        $this->visitationService = new VisitationService(
            $academicRepository,
            $schoolRepository,
            $tokenService,
            $assessmentRepository,
            $userRepository,
            $instrumentRepository,
            $scheduleRepository,
            $instrumentCriteriaRepository,
            $componentRepository,
            $componentDetailRepository,
            $assessmentAnswerRepository,
            $assessmentScoreRepository
        );

        $this->tokenService =  new TokenService();
        $this->userService =  new UserService();
    }

    public function index(): \Inertia\Response
    {

        $user = $this->tokenService->currentUser();

        $school = $this->userService->getById($user->id)->school;

        $data = $this->visitationService->getAcademicSemester($school->id);
        return Inertia::render("Visitation/Index", [
            "data" => $data
        ]);
    }

    public function filter(Request $request)
    {
        $user = $this->tokenService->currentUser();

        $school = $this->userService->getById($user->id)->school;

        $academic_year = $request->query('academic_year');
        $semester = $request->query('smt');

        if(!$academic_year || !$semester) {
            abort("404");
        }

        try {

            $data = $this->visitationService->getFilterByAcademicSemester($academic_year, $semester, $school->id);

            return Inertia::render("Visitation/Filter", [
                "data"  => $data,
                "year"  => $academic_year,
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

        $user = $this->tokenService->currentUser();

        $school = $this->userService->getById($user->id)->school;

        try {
            $response = $this->visitationService->create($dto, $school->id);
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

    public function score(StoreScoreRequest $request, string $assessment_id): JsonResponse
    {
        $data = $request->validationData();

        $dto = new ScoredAssessmentDTO();
        $dto->assessmentId  = $assessment_id;
        $dto->componentId = $data['instrument_id'];
        $dto->componentDetailId = $data['item_id'];
        $dto->value = $data['value'];

        try {
            $data = $this->visitationService->scored($dto);
            return response()->json([
                'status' => true,
                'message' => 'successfully scored',
                'data' => $data
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function analysis(UpdateAnalysisRequest $request, string $assessment_id): JsonResponse
    {
        $data = $request->validationData();

        $dto = new AnalysisUpdateDTO();
        $dto->assessmentId = $assessment_id;
        $dto->finder = $data['finder'];
        $dto->actionPlan = $data['action_plan'];

        try {
            $data = $this->visitationService->UpdateAnalysis($dto);
            return response()->json([
                'status' => true,
                'message' => 'successfully updated',
                'data' => $data
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function finish(string $assessment_id): JsonResponse
    {
        try {
            $this->visitationService->finish($assessment_id);
            return response()->json([
                'status' => true,
                'message' => 'successfully updated',
                'data' => []
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function updateProgress(Request $request)
    {

        try {
            $validated = $request->validate([
                'assessmentId' => 'required|string',
                'componentId' => 'required|integer',
                'progress' => 'required|numeric',
                'percentage' => 'required|integer|between:0,100',
                'checkpoint' => 'required|integer|between:0,4'
            ]);
    
            // Update progress di tabel assessment_answers
            $answer = AssessmentAnswer::where('assessment_id', $validated['assessmentId'])
                ->where('component_id', $validated['componentId'])
                ->first();
    
            if (!$answer) {
                return response()->json([
                    'success' => false,
                    'message' => 'Answer not found'
                ], 404);
            }
    
            $answer->progress = $validated['progress'];
            $answer->percentage = $validated['percentage'] >= 99 ? 100 : $validated['percentage'];
            $answer->last_checkpoint = $validated['checkpoint'];
            
            if ($validated['percentage'] >= 99) {
                $answer->is_done = true;
            }
    
            $answer->save();
    
            return response()->json([
                'success' => true,
                'message' => 'Progress updated successfully',
                'data' => $answer
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
