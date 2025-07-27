<?php

namespace App\Repositories;

use App\Models\TeachingDevice;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class TeachingDeviceRepository
{
    /**
     * Get teaching device by assessment ID
     */
    public function getByAssessmentId(string $assessmentId): ?TeachingDevice
    {
        return TeachingDevice::where('assessment_id', $assessmentId)
                            ->where('name', 'Perangkat Pembelajaran')
                            ->first();
    }

    /**
     * Create teaching device record
     */
    public function create(array $data): TeachingDevice
    {
        return TeachingDevice::create($data);
    }

    /**
     * Update teaching device with file upload
     */
    public function updateWithFile(TeachingDevice $teachingDevice, UploadedFile $file): TeachingDevice
    {
        // Delete old file if exists
        if ($teachingDevice->file_path && Storage::disk('public')->exists($teachingDevice->file_path)) {
            Storage::disk('public')->delete($teachingDevice->file_path);
        }

        // Store new file
        $fileName = time() . '_' . $file->getClientOriginalName();
        $filePath = $file->storeAs('teaching-devices', $fileName, 'public');
        $fileSize = $this->formatFileSize($file->getSize());

        // Update record
        $teachingDevice->update([
            'is_uploaded' => true,
            'file_name' => $fileName,
            'file_path' => $filePath,
            'file_size' => $fileSize,
            'file_type' => $file->getClientOriginalExtension(),
            'uploaded_at' => now()
        ]);

        return $teachingDevice->fresh();
    }

    /**
     * Remove file from teaching device
     */
    public function removeFile(TeachingDevice $teachingDevice): TeachingDevice
    {
        // Delete file from storage
        if ($teachingDevice->file_path && Storage::disk('public')->exists($teachingDevice->file_path)) {
            Storage::disk('public')->delete($teachingDevice->file_path);
        }

        // Update record
        $teachingDevice->update([
            'is_uploaded' => false,
            'file_name' => null,
            'file_path' => null,
            'file_size' => null,
            'file_type' => null,
            'uploaded_at' => null
        ]);

        return $teachingDevice->fresh();
    }

    /**
     * Format file size to human readable format
     */
    private function formatFileSize(int $bytes): string
    {
        if ($bytes === 0) return '0 Bytes';

        $k = 1024;
        $sizes = ['Bytes', 'KB', 'MB', 'GB'];
        $i = floor(log($bytes) / log($k));

        return round($bytes / pow($k, $i), 2) . ' ' . $sizes[$i];
    }

    /**
     * Check if file type is allowed
     */
    public function isFileTypeAllowed(UploadedFile $file): bool
    {
        $allowedTypes = ['pdf', 'doc', 'docx', 'ppt', 'pptx'];
        $fileExtension = strtolower($file->getClientOriginalExtension());
        
        return in_array($fileExtension, $allowedTypes);
    }

    /**
     * Check if file size is within limit (10MB)
     */
    public function isFileSizeAllowed(UploadedFile $file): bool
    {
        $maxSize = 10 * 1024 * 1024; // 10MB in bytes
        return $file->getSize() <= $maxSize;
    }
}