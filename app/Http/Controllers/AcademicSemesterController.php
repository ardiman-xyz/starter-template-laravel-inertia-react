<?php

namespace App\Http\Controllers;

use App\DTO\AcademicSemesterDTO;
use App\Http\Requests\AcademicSemesterRequest;
use App\Services\AcademicSemesterService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class AcademicSemesterController extends Controller
{
    public function __construct(
        protected AcademicSemesterService $academicSemesterService
    ){}

    public function index(): InertiaResponse
    {
        $data = $this->academicSemesterService->all();

        return Inertia::render("AcademicSemester/Index", [
            "data" => $data
        ]);
    }

    public function store(AcademicSemesterRequest $request, AcademicSemesterDTO $dto): JsonResponse
    {
        $data = $request->validationData();

        $dto->year = $data['year'];
        $dto->academicYear = $data['academic_year'];
        $dto->semester = $data['semester'];
        $dto->startDate = $data['start_date'];
        $dto->endDate = $data['end_date'];

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
}
