<?php

namespace App\Services;

use App\DTO\Settings\UpdateGeneralInformationDTO;
use App\Repositories\SettingRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class SettingService
{
    public function __construct(
        protected SettingRepository $settingRepository,
        protected UserRepository $userRepository,
    ){}

    public function updateGeneralInformationSchool(UpdateGeneralInformationDTO $dto, string $id)
    {
        $information = $this->settingRepository->findById($id);
        if(!$information) throw new Exception("Tidak ada informasi yang ditemukan");

        $user = $this->userRepository->getById($dto->userId);
        if(!$user) throw new Exception("Tidak ada user yang ditemukan");

        $information->name = $dto->name;
        $information->leader_name = $dto->leaderName;
        $information->address = $dto->address;
        $information->npsn = $dto->npsn;
        $information->education_level = $dto->educationLevel;
        $information->status = $dto->status;
        $information->email = $dto->email;
        $information->save();

        return $information;
    }

    /**
     * @throws Exception
     */
    public function updateCoverSchool(UploadedFile $file, string $id)
    {
        $information = $this->settingRepository->findById($id);
        if(!$information) throw new Exception("Tidak ada informasi yang ditemukan");

        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
            throw new Exception("Tipe file tidak diizinkan. Harap unggah file gambar (JPEG, PNG, atau WebP).");
        }

        $path = $file->store('settings', 'public');

        if ($information->school_image !== null) {
            Storage::disk('public')->delete($information->school_image);
        }

        $information->school_image = $path;
        $information->save();

        return $information;

    }
}
