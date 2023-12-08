<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Services\RoleServices;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response as InertiaView;
use Exception;

class RoleController extends Controller
{
    private RoleServices $roleServices;

    public function __construct()
    {
        $this->roleServices = new RoleServices();
    }

    public function index(): InertiaView
    {
        $roles = $this->roleServices->getAll();

        return Inertia::render("Roles/Index", [
            "roles" => $roles
        ]);
    }

    public function create(CreateRoleRequest $request): JsonResponse
    {
        $data = $request->validationData();

        try {
            $data = $this->roleServices->save($data['name']);
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

    public function destroy(string $id): JsonResponse
    {
        try {
            $this->roleServices->delete($id);
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil di dihapus',
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }

    }

    public function update(UpdateRoleRequest $request, string $id): JsonResponse
    {
        $data = $request->validationData();

        try {
            $this->roleServices->update($data["name"], $id);
            return response()->json([
                'success' => true,
                'message' => 'Role berhasil di update',
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
