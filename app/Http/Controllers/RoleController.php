<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRequest;
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
        return Inertia::render("Roles/Index");
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
}
