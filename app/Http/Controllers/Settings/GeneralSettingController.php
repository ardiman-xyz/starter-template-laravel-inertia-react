<?php

namespace App\Http\Controllers\Settings;

use App\DTO\Settings\UpdateGeneralInformationDTO;
use App\Http\Requests\UpdateGeneralInfoRequest;
use App\Services\SettingService;
use App\Services\TokenService;
use Exception;
use Illuminate\Http\Request;

class GeneralSettingController
{
    public function __construct(
        protected TokenService $tokenService,
        protected SettingService $settingService
    ){}

    public function update(UpdateGeneralInfoRequest $request, string $id)
    {
        $data = $request->validated();


        try {
            $dto = new UpdateGeneralInformationDTO();
            $dto->userId = $this->tokenService->userId();
            $dto->name = $data['school_name'];
            $dto->leaderName = $data['leader_name'];
            $dto->email = $data['email'];
            $dto->address = $data['address'];
            $dto->npsn = $data['npsn'];
            $dto->status = $data['school_status'];
            $dto->educationLevel = $data['education_level'];

            $res = $this->settingService->updateGeneralInformationSchool($dto, $id);

            return response()->json([
                "status" => false,
                "message" => "Data berhasil diupdate",
                "data" => $res
            ], 201);


        }catch (Exception $exception){
            return response()->json([
                "status" => false,
                "message" => $exception->getMessage(),
                "data" => null
            ], 400);
        }
    }
}
