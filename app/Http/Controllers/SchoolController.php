<?php

namespace App\Http\Controllers;

use App\DTO\SchoolDTO;
use App\Http\Requests\StoreSchoolRequest;
use App\Repositories\SchoolRepository;
use App\Services\SchoolService;
use App\Services\TokenService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class SchoolController extends Controller
{

    private SchoolService $schoolService;

    public function __construct()
    {
        $schoolRepository = new SchoolRepository();
        $tokenService = new TokenService();
        $this->schoolService = new SchoolService($schoolRepository, $tokenService);
    }

    /**
     * @throws Exception
     */
    public function create()
    {
        try {
            $this->schoolService->getByUserId();
            return redirect()->route("dashboard");
        }catch (Exception $exception)
        {
            return Inertia::render("School/Create");
        }


    }

    public function store(StoreSchoolRequest $request): JsonResponse
    {
        $data = $request->validationData();

        $dto = new SchoolDTO();
        $dto->name = $data['name'];
        $dto->leaderName = $data['leader_name'];
        $dto->address = $data['address'];

        try {
            $response = $this->schoolService->create($dto);
            return response()->json([
                'status' => true,
                'message' => 'Successfully created',
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
