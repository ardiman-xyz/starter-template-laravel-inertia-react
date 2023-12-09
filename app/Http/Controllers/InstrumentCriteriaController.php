<?php

namespace App\Http\Controllers;

use App\DTO\CreateInstrumentCriteriaDTO;
use App\DTO\UpdateInstrumentItemDTO;
use App\Http\Requests\CreateInstrumentCriteria;
use App\Http\Requests\UpdateInstrumenItem;
use App\Repositories\InstrumentCriteriaRepository;
use App\Repositories\InstrumentRepository;
use App\Services\InstrumentCriteriaService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;

class InstrumentCriteriaController extends Controller
{
    private InstrumentCriteriaService $criteriaService;

    public function __construct()
    {
        $criteriaRepository = new InstrumentCriteriaRepository();
        $instrumentRepository = new InstrumentRepository();
        $this->criteriaService = new InstrumentCriteriaService($criteriaRepository, $instrumentRepository);
    }

    public function index(string $instrument_id): JsonResponse
    {
        try {
            $response = $this->criteriaService->getAll($instrument_id);
            return response()->json([
                'status' => true,
                'message' => 'get successfully',
                'data' => $response
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function store(CreateInstrumentCriteria $request, string $instrument_id): JsonResponse
    {
        $data = $request->validationData();

        $dto = new CreateInstrumentCriteriaDTO();
        $dto->instrumentId = $instrument_id;
        $dto->title = $data['title'];
        $dto->maxScore = $data['max_score'];

        try {
            $response = $this->criteriaService->create($dto);
            return response()->json([
                'status' => true,
                'message' => 'Successfully created',
                'data' => $response
            ], 201);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function update(UpdateInstrumenItem $request): JsonResponse
    {
        $data = $request->validationData();

        $dto = new UpdateInstrumentItemDTO();
        $dto->id = $data["id"];
        $dto->title = $data["title"];
        $dto->maxScore = $data["max_score"];

        try {
            $response = $this->criteriaService->update($dto);
            return response()->json([
                'status' => true,
                'message' => 'Successfully updated',
                'data' => $response
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }

    public function destroy(string $id): JsonResponse
    {
        try {
             $this->criteriaService->delete($id);
            return response()->json([
                'status' => true,
                'message' => 'Successfully deleted',
                'data' => []
            ], 200);
        }catch (Exception $exception) {
            return response()->json([
                'success' => false,
                'message' => $exception->getMessage()
            ], 400);
        }
    }
}
