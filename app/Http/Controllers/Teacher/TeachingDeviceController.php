<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Services\TeachingDeviceService;
use App\Services\TokenService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TeachingDeviceController extends Controller
{
    private TeachingDeviceService $teachingDeviceService;
    private TokenService $tokenService;

    public function __construct(
        TeachingDeviceService $teachingDeviceService,
        TokenService $tokenService
    ) {
        $this->teachingDeviceService = $teachingDeviceService;
        $this->tokenService = $tokenService;
    }

    /**
     * Get teaching device info for assessment
     */
    public function show(string $assessmentId): JsonResponse
    {
        try {
            $teachingDevice = $this->teachingDeviceService->getByAssessmentId($assessmentId);
            
            if (!$teachingDevice) {
                return response()->json([
                    'success' => false,
                    'message' => 'Teaching device not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'uploaded' => $teachingDevice->is_uploaded,
                    'file_name' => $teachingDevice->file_name,
                    'file_size' => $teachingDevice->file_size,
                    'file_url' => $teachingDevice->file_url,
                    'uploaded_at' => $teachingDevice->uploaded_at?->format('Y-m-d H:i:s')
                ]
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Upload file for teaching device
     */
    public function upload(Request $request, string $assessmentId): JsonResponse
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,doc,docx,ppt,pptx|max:10240' // 10MB max
        ], [
            'file.required' => 'File harus dipilih',
            'file.file' => 'Upload harus berupa file',
            'file.mimes' => 'File harus berformat PDF, DOC, DOCX, PPT, atau PPTX',
            'file.max' => 'Ukuran file maksimal 10MB'
        ]);

        try {
            $file = $request->file('file');
            $teachingDevice = $this->teachingDeviceService->uploadFile($assessmentId, $file);

            return response()->json([
                'success' => true,
                'message' => 'File berhasil diupload',
                'data' => [
                    'uploaded' => $teachingDevice->is_uploaded,
                    'file_name' => $teachingDevice->file_name,
                    'file_size' => $teachingDevice->file_size,
                    'file_url' => $teachingDevice->file_url,
                    'uploaded_at' => $teachingDevice->uploaded_at?->format('Y-m-d H:i:s')
                ]
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Remove uploaded file
     */
    public function remove(string $assessmentId): JsonResponse
    {
        try {
            $teachingDevice = $this->teachingDeviceService->removeFile($assessmentId);

            return response()->json([
                'success' => true,
                'message' => 'File berhasil dihapus',
                'data' => [
                    'uploaded' => $teachingDevice->is_uploaded,
                    'file_name' => null,
                    'file_size' => null,
                    'file_url' => null,
                    'uploaded_at' => null
                ]
            ]);

        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 400);
        }
    }
}
