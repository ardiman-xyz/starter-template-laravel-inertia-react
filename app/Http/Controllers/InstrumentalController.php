<?php

namespace App\Http\Controllers;

use App\DTO\UpdateInstrumentDTO;
use App\Http\Requests\CreateInstrumentRequest;
use App\Models\AssessmentStage;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\InstrumentRepository;
use App\Services\InstrumentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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
        $instruments = $this->instrumentService->getAll();

        return Inertia::render("Instrumental/Instrument", [
            "stage" => $stage,
            "instruments" => $instruments
        ]);
    }

    public function store(CreateInstrumentRequest $request, string $stage_id): JsonResponse
    {
        $data = $request->validationData();

        try {
            $data = $this->instrumentService->create($data['name'], $data["response_type"], $stage_id);
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

    public function update(CreateInstrumentRequest $request, string $stage_id)
    {
        $data = $request->validationData();

        $instrumentUpdate = new UpdateInstrumentDTO();
        $instrumentUpdate->stageId = $stage_id;
        $instrumentUpdate->id = $data['id'];
        $instrumentUpdate->name = $data['name'];
        $instrumentUpdate->type = $data['type'];

        try {
            $data = $this->instrumentService->update($instrumentUpdate);
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
}
