<?php

namespace App\Http\Controllers;

use App\DTO\TeacherDTO;
use App\Http\Requests\StoreTeacherRequest;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use App\Services\TeacherService;
use App\Services\TokenService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class TeacherController extends Controller
{
    private TeacherService $teacherService;

    public function __construct()
    {
        $userRepository = new UserRepository();
        $tokenService = new TokenService();
        $schoolRepository = new SchoolRepository();
        $this->teacherService = new TeacherService($userRepository, $tokenService, $schoolRepository);
    }

    public function index(): \Inertia\Response
    {
        $data = $this->teacherService->getAll();

        return Inertia::render("Teacher/Page", [
            "teachers" => $data
        ]);
    }

    public function store(StoreTeacherRequest $request): JsonResponse
    {
        $data = $request->validationData();

        $dto = new TeacherDTO();
        $dto->name  = $data['name'];
        $dto->email = $data['email'];
        $dto->password = $data['password'];

        try {
            $response = $this->teacherService->create($dto);
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

    public function invitations(string $id): JsonResponse
    {
        try {
            $response = $this->teacherService->invitations($id);
            return response()->json([
                'status' => true,
                'message' => 'Teacher successfully created',
                'data' => [
                    "link" => $response
                ]
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
