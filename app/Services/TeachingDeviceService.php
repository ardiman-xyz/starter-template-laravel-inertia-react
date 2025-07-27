<?php

namespace App\Services;

use App\Models\TeachingDevice;
use App\Repositories\TeachingDeviceRepository;
use Exception;
use Illuminate\Http\UploadedFile;

class TeachingDeviceService
{
    private TeachingDeviceRepository $teachingDeviceRepository;

    public function __construct(TeachingDeviceRepository $teachingDeviceRepository)
    {
        $this->teachingDeviceRepository = $teachingDeviceRepository;
    }

    /**
     * Get teaching device by assessment ID
     */
    public function getByAssessmentId(string $assessmentId): ?TeachingDevice
    {
        return $this->teachingDeviceRepository->getByAssessmentId($assessmentId);
    }

    /**
     * Upload file for teaching device
     * 
     * @throws Exception
     */
    public function uploadFile(string $assessmentId, UploadedFile $file): TeachingDevice
    {
        // Get teaching device record
        $teachingDevice = $this->teachingDeviceRepository->getByAssessmentId($assessmentId);
        
        if (!$teachingDevice) {
            throw new Exception("Teaching device record not found for this assessment");
        }

        // Validate file type
        if (!$this->teachingDeviceRepository->isFileTypeAllowed($file)) {
            throw new Exception("File type not allowed. Please upload PDF, DOC, DOCX, PPT, or PPTX files only.");
        }

        // Validate file size
        if (!$this->teachingDeviceRepository->isFileSizeAllowed($file)) {
            throw new Exception("File size too large. Maximum file size is 10MB.");
        }

        try {
            return $this->teachingDeviceRepository->updateWithFile($teachingDevice, $file);
        } catch (Exception $e) {
            throw new Exception("Failed to upload file: " . $e->getMessage());
        }
    }

    /**
     * Remove uploaded file
     * 
     * @throws Exception
     */
    public function removeFile(string $assessmentId): TeachingDevice
    {
        $teachingDevice = $this->teachingDeviceRepository->getByAssessmentId($assessmentId);
        
        if (!$teachingDevice) {
            throw new Exception("Teaching device record not found for this assessment");
        }

        if (!$teachingDevice->is_uploaded) {
            throw new Exception("No file uploaded for this teaching device");
        }

        try {
            return $this->teachingDeviceRepository->removeFile($teachingDevice);
        } catch (Exception $e) {
            throw new Exception("Failed to remove file: " . $e->getMessage());
        }
    }

    /**
     * Check if teaching device has uploaded file
     */
    public function hasUploadedFile(string $assessmentId): bool
    {
        $teachingDevice = $this->teachingDeviceRepository->getByAssessmentId($assessmentId);
        return $teachingDevice ? $teachingDevice->hasUploadedFile() : false;
    }

    /**
     * Get file download URL
     */
    public function getFileUrl(string $assessmentId): ?string
    {
        $teachingDevice = $this->teachingDeviceRepository->getByAssessmentId($assessmentId);
        return $teachingDevice ? $teachingDevice->file_url : null;
    }
}