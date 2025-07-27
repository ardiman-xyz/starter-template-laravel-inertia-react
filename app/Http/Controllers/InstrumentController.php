<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComponentRequest;
use App\Repositories\ComponentRepository;
use App\Services\ComponentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class InstrumentController extends Controller
{
    private ComponentService $componentService;

    public function __construct()
    {
        $componentRepository = new ComponentRepository();
        $this->componentService = new ComponentService($componentRepository);
    }

    public function index(): \Inertia\Response
    {
        $instruments = $this->componentService->getAll();


        return Inertia::render("Instruments/Index", [
            "instruments"    => $instruments
        ]);
    }

    public function store(StoreComponentRequest $request): JsonResponse
    {
        $data = $request->validationData();

        try {
            $this->componentService->create($data['name']);
            return response()->json([
                'status' => true,
                'message' => 'Instrument successfully created!',
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

    public function show(string $id): \Inertia\Response
    {
        try {
            $instrument = $this->componentService->getById($id);
            return Inertia::render("Instruments/Detail", [
                "instrument" => $instrument
            ]);
        }catch (Exception $exception)
        {
            abort(404, $exception->getMessage());
        }
    }

    public function update(Request $request, string $id)
    {

        $validated = $request->validate([
            'name' => 'required|string|max:255'
        ], [
            'name.required' => 'Nama komponen harus diisi',
            'name.string' => 'Nama harus berupa text',
            'name.max' => 'Nama maksimal 255 karakter'
        ]);


        try {
            $this->componentService->update($validated['name'], $id);
            return response()->json([
                'status' => true,
                'message' => 'Instrument successfully updated!',
                'data' => null
            ], 200);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }

    public function runMigration()
    {
        try {
           
            $this->componentService->runMigration();

            return response()->json([
                'message' => 'Data default berhasil ditambahkan'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menambahkan data default',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
