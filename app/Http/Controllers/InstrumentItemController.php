<?php

namespace App\Http\Controllers;

use App\DTO\CreateComponentItemDTO;
use App\DTO\UpdateComponentItemDTO;
use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Repositories\ComponentDetailRepository;
use App\Repositories\ComponentRepository;
use App\Services\ComponentDetailService;
use Exception;
use Illuminate\Http\JsonResponse;

class InstrumentItemController extends Controller
{

    private ComponentDetailService $componentDetailService;

    public function __construct()
    {
        $componentDetailRepository = new ComponentDetailRepository();
        $componentRepository = new ComponentRepository();
        $this->componentDetailService = new ComponentDetailService($componentDetailRepository, $componentRepository);
    }

    public function store(StoreItemRequest $request, string $instrument_id): JsonResponse
    {
        $data = $request->validationData();

        $dto = new CreateComponentItemDTO();
        $dto->documentId = $instrument_id;
        $dto->name = $data['name'];
        $dto->maxScore = $data['max_score'];

        try {
            $data = $this->componentDetailService->create($dto);
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

    public function Edit(UpdateItemRequest $request): JsonResponse
    {
        $data = $request->validationData();

        $dto = new UpdateComponentItemDTO();
        $dto->id = $data['id'];
        $dto->name = $data['name'];
        $dto->maxScore = $data['max_score'];

        try {
            $this->componentDetailService->update($dto);
            return response()->json([
                'status' => true,
                'message' => 'Updated successfully',
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

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->componentDetailService->deleteById($id);
            return response()->json([
                'status' => true,
                'message' => 'Deleted successfully',
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
}
