<?php

namespace App\Services;

use App\DTO\Settings\UpdateGeneralInformationDTO;
use App\DTO\Settings\UpdatePasswordUserDto;
use App\Repositories\SettingRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
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

    /**
     * @throws Exception
     */
    public function updateUserPassword(UpdatePasswordUserDto $dto)
    {
        $user = $this->userRepository->getById($dto->userId);
        if (!$user) {
            throw new Exception("User tidak ditemukan");
        }

        if (!Hash::check($dto->oldPassword, $user->password)) {
            throw new Exception("Password lama tidak sesuai");
        }

        if ($dto->oldPassword === $dto->newPassword) {
            throw new Exception("Password baru harus berbeda dari password lama");
        }

        $hashedPassword = Hash::make($dto->newPassword);

        $user->password = $hashedPassword;
        $user->save();

        // You might want to perform additional actions here, such as:
        // - Logging the password change
        // - Sending a notification email to the user
        // - Invalidating other sessions (if you want to force re-login after password change)

        return $user;
    }

    public function updateEmail(string $email, string $userId)
    {
        $user = $this->userRepository->getById($userId);
        if (!$user) throw new Exception("User tidak ditemukan");

        $existingUser = $this->userRepository->isDuplicateEmail($email, $userId);
        if ($existingUser)  throw new Exception("Email sudah digunakan oleh pengguna lain");

        $user->email = $email;
        $user->save();

        return $user;
    }

    public function updateAvatarUser(UploadedFile $file, string $userId)
    {
        $user = $this->userRepository->getById($userId);
        if (!$user) throw new Exception("User tidak ditemukan");

        $allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];

        if (!in_array($file->getMimeType(), $allowedMimeTypes)) {
            throw new Exception("Tipe file tidak diizinkan. Harap unggah file gambar (JPEG, PNG, atau WebP).");
        }

        $path = $file->store('users', 'public');

        if ($user->profile_picture !== null) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $user->profile_picture = $path;
        $user->save();

        return $user;

    }

}
