<?php

namespace App\Http\Controllers;

use App\DTO\UserDTO;
use App\Http\Requests\CreateUserRequest;
use App\Services\RoleServices;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as ViewInertia;
use Exception;
use  Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    private RoleServices $roleServices;
    private UserService $userService;

    public function __construct()
    {
        $this->roleServices = new RoleServices();
        $this->userService = new UserService();
    }

    public function index(): ViewInertia
    {

        return Inertia::render("User/Index", [
            "roles" => $this->roleServices->getAll(),
            "users" => $this->userService->getAllWithRole()
        ]);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        $data = $request->validationData();

        $userDTO = new UserDTO(
          $data['name'],
          $data['email'],
          $data['password'],
          $data['role']
        );

        try {
            $this->userService->save($userDTO);
            return response()->json([
                'success' => true,
                'message' => 'User berhasil di simpan',
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }

    public function destroy(string $id)
    {
        try {
            $this->userService->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'User berhasil di hapus',
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
