<?php

namespace App\Http\Controllers\Teacher;

use App\DTO\UpdateBioDTO;
use App\Http\Requests\CreateAvatarRequest;
use App\Http\Requests\UpdateBioRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Repositories\UserRepository;
use App\Services\Teachers\ProfileService;
use App\Services\TokenService;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;
use Exception;

class ProfileController
{
    private ProfileService $profileService;

    public function __construct()
    {
        $userRepository = new UserRepository();
        $userTokenService = new TokenService();
        $this->profileService = new ProfileService($userRepository, $userTokenService);
    }

    public function index(): \Inertia\Response
    {
        return Inertia::render("Teachers/Profile/Index");
    }

    public function avatar(CreateAvatarRequest $request): JsonResponse
    {
        $file = $request->file('avatar');

        try {
            $data = $this->profileService->updateAvatarUser($file);
            return response()->json([
                'status' => true,
                'message' => 'Avatar berhasil di update',
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

    public function change_password(UpdatePasswordRequest $request)
    {
        $data = $request->validationData();

        try {
            $data = $this->profileService->update_password($data['current_password'], $data["password"]);
            return response()->json([
                'status' => true,
                'message' => 'Avatar berhasil di update',
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

    public function bio(UpdateBioRequest $request)
    {
        $data = $request->validationData();

        $dto = new UpdateBioDTO();
        $dto->name = $data['name'];
        $dto->email = $data['email'];
        $dto->gender = $data['gender'];
        $dto->address = $data['address'];
        $dto->nip = $data['nip'];
        $dto->phone = $data['phone'];

        try {
            $data = $this->profileService->update_bio($dto);
            return response()->json([
                'status' => true,
                'message' => 'Bio berhasil di update',
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
