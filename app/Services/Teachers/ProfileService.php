<?php

namespace App\Services\Teachers;

use App\DTO\UpdateBioDTO;
use App\Repositories\UserRepository;
use App\Services\TokenService;
use Illuminate\Http\UploadedFile;
use Exception;
use Illuminate\Support\Facades\Storage;

class ProfileService
{
    private UserRepository $userRepository;
    private TokenService $tokenService;
    private $userId;

    public function __construct(UserRepository $userRepository, TokenService $tokenService)
    {
        $this->userRepository = $userRepository;
        $this->tokenService = $tokenService;
        $this->userId = $tokenService->userId();
    }

    /**
     * @throws Exception
     */
    public function updateAvatarUser(UploadedFile $file): \App\Models\User
    {
        $id = $this->tokenService->userId();

        $user = $this->userRepository->getById($id);
        if(!$user) throw new Exception("Teacher not found");

        if($user->profile_picture !== null) {

            Storage::delete("public/".$user->profile_picture);
        }

        $fileName = time() . '.' . $file->extension();

        $url = $file->storeAs('/teachers/avatars', $fileName, 'public');

        $user->profile_picture = $url;

        return $this->userRepository->update($user->id, $user);

    }

    /**
     * @throws Exception
     */
    public function update_password(string $current, string $new): \App\Models\User
    {
        $user = $this->userRepository->getById($this->userId);
        if(!$user) throw new Exception("Teacher not found");

        if (!password_verify($current, $user->password)) throw new Exception("Password saat ini tidak sesuai");

        $user->password = bcrypt($new);

        return $this->userRepository->update($user->id, $user);
    }

    /**
     * @throws Exception
     */
    public function update_bio(UpdateBioDTO $dto): \App\Models\User
    {
        $user = $this->userRepository->getById($this->userId);
        if(!$user) throw new Exception("Teacher not found");

        $user->name = $dto->name;
        $user->email = $dto->email;
        $user->gender = $dto->gender;
        $user->nip      = $dto->nip;
        $user->address = $dto->address;
        $user->phone_number = $dto->phone;

        return $this->userRepository->update($user->id, $user);

    }
}
