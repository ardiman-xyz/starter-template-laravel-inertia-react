<?php

namespace App\Http\Controllers\Settings;

use App\DTO\Settings\UpdatePasswordUserDto;
use App\Http\Requests\UpdateEmailRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Services\SettingService;
use App\Services\TokenService;
use Exception;
use Illuminate\Http\JsonResponse;

class AccountSetting
{

    public function __construct(
        protected SettingService $settingService,
        protected TokenService $tokenService
    ){}

    public function updatePassword(UpdatePasswordRequest $request, string $schoolId): JsonResponse
    {
        $data = $request->validated();

        try {
            $dto = new UpdatePasswordUserDto();
            $dto->userId = $this->tokenService->userId();
            $dto->newPassword = $data['new_password'];
            $dto->oldPassword = $data['old_password'];

            $res = $this->settingService->updateUserPassword($dto);

            return response()->json([
                "status" => false,
                "message" => "Password berhasil di update",
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

    public function updateEmail(UpdateEmailRequest $request, string $userId)
    {
        $data = $request->validated();
        $email = $data['email'];

        try {

            $res = $this->settingService->updateEmail($email, $userId);

            return response()->json([
                "status" => false,
                "message" => "Email berhasil di update",
                "data" => $res
            ]);


        }catch (Exception $exception){
            return response()->json([
                "status" => false,
                "message" => $exception->getMessage(),
                "data" => null
            ], 400);
        }
    }
}
