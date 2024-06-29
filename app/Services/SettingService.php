<?php

namespace App\Services;

use App\DTO\Settings\UpdateGeneralInformationDTO;
use App\Repositories\SettingRepository;
use App\Repositories\UserRepository;
use Exception;

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
}
