<?php

namespace App\Http\Controllers;

use App\DTO\AcademicSemesterDTO;
use App\Http\Requests\AcademicSemesterRequest;
use App\Services\AcademicSemesterService;
use App\Services\TokenService;
use App\Services\UserService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AcademicSemesterController extends Controller
{
    public function __construct(
        protected AcademicSemesterService $academicSemesterService,
        protected $tokenService = new TokenService(),
        protected  $userService = new UserService(),
    ){}

    public function index(): InertiaResponse
    {

        $user = $this->tokenService->currentUser();

        $school = $this->userService->getById($user->id)->school;


        $data = $this->academicSemesterService->all($school->id);
       
        return Inertia::render("AcademicSemester/Index", [
            "data" => $data
        ]);
    }

    public function store(AcademicSemesterRequest $request, AcademicSemesterDTO $dto): JsonResponse
    {
        $user = $this->tokenService->currentUser();

        $school = $this->userService->getById($user->id)->school;

        $data = $request->validationData();

        $dto->year = $data['year'];
        $dto->academicYear = $data['academic_year'];
        $dto->semester = $data['semester'];
        $dto->startDate = $data['start_date'];
        $dto->endDate = $data['end_date'];
        $dto->schoolId = $school->id;


        try {
            $this->academicSemesterService->create($dto);
            return response()->json([
                'status' => true,
                'message' => 'Successfully created!',
                'data' => []
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }

    public function update(AcademicSemesterRequest $request, AcademicSemesterDTO $dto, string $id): JsonResponse
    {

        $user = $this->tokenService->currentUser();

        $school = $this->userService->getById($user->id)->school;

        $data = $request->validationData();

        $dto->schoolId = $school->id;
        $dto->year = $data['year'];
        $dto->academicYear = $data['academic_year'];
        $dto->semester = $data['semester'];
        $dto->startDate = $data['start_date'];
        $dto->endDate = $data['end_date'];

        try {
            $this->academicSemesterService->update($dto, $id);
            return response()->json([
                'status' => true,
                'message' => 'Successfully updated!',
                'data' => []
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
            $this->academicSemesterService->deleteById($id);
            return response()->json([
                'status' => true,
                'message' => 'Successfully deleted',
                'data' => []
            ]);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
