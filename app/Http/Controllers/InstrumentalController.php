<?php

namespace App\Http\Controllers;

use App\DTO\CreateInstrumentDTO;
use App\DTO\UpdateInstrumentDTO;
use App\Http\Requests\CreateInstrumentRequest;
use App\Http\Requests\UpdateInstrumentRequest;
use App\Models\AssessmentStage;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\InstrumentRepository;
use App\Services\InstrumentService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Exception;

class InstrumentalController extends Controller
{
    private InstrumentService $instrumentService;

    public function __construct()
    {
        $instrumentRepository = new InstrumentRepository();
        $assessmentStageRepository = new AssessmentStageRepository();
        $this->instrumentService = new InstrumentService($instrumentRepository, $assessmentStageRepository);
    }

    public function index(): \Inertia\Response
    {
        return Inertia::render("Instrumental/Index", [
            "stages" => AssessmentStage::all(["id", "name"])
        ]);
    }

    public function instrument(string $stageId): \Inertia\Response
    {
        $stage = AssessmentStage::findOrFail($stageId);
        $instruments = $this->instrumentService->getByAssessmentStageId($stageId);

        return Inertia::render("Instrumental/Instrument", [
            "stage" => $stage,
            "instruments" => $instruments
        ]);
    }

    public function store(CreateInstrumentRequest $request, string $stage_id)
    {
        $data = $request->validationData();

        $dto = new CreateInstrumentDTO();
        $dto->assessmentStageId = $stage_id;
        $dto->name = $data['name'];
        $dto->type = $data['response_type'];
        $dto->description = $data['description'];
        $dto->allowedExtensions = $data["allowed_extensions"] ?? [];
        $dto->maxSize = $data['max_size'] ?? null;
        $dto->isMultiple = $data["is_multiple"] ?? null;

        try {
            $data = $this->instrumentService->create($dto);
            return response()->json([
                'status' => true,
                'message' => 'Data berhasil di simpan',
                'data' => $data
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }

    public function update(UpdateInstrumentRequest $request, string $instrument_id): JsonResponse
    {
        $data = $request->validationData();

        $instrumentUpdate = new CreateInstrumentDTO();
        $instrumentUpdate->name = $data['name'];
        $instrumentUpdate->type = $data['response_type'];
        $instrumentUpdate->description = $data['description'];
        $instrumentUpdate->allowedExtensions = $data["allowed_extensions"] ?? [];
        $instrumentUpdate->maxSize = $data['max_size'] ?? null;
        $instrumentUpdate->isMultiple = $data["is_multiple"] ?? null;

        try {
            $data = $this->instrumentService->update($instrumentUpdate, $instrument_id);
            return response()->json([
                'status' => true,
                'message' => 'Data berhasil di update',
                'data' => $data
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }
    public function destroy(string $instrument_id): JsonResponse
    {
        try {
            $this->instrumentService->delete($instrument_id);
            return response()->json([
                'status' => true,
                'message' => 'Instrumen berhasil di hapus',
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
