<?php

namespace App\Repositories;

use App\DTO\UserDTO;
use App\Models\User;
use App\Models\User as Model;

class UserRepository
{
    public function create(UserDTO $data)
    {
        return Model::create([
            "name"              => $data->name,
            "school_id"         => $data->schoolId,
            "email"             => $data->email,
            "email_verified_at" => $data->emailVerifiedAt,
            "password"          => $data->password,
            "gender"            => $data->gender,
            "nip"               => $data->nip,
            "address"           => $data->address,
            "profile_picture"   => $data->profilePicture,
            "remember_token"    => $data->rememberToken,
        ]);
    }

    public function getByEmail(string $email)
    {
        return Model::where("email", $email)->first();
    }

    public function isDuplicateEmail(string $email, int $userId)
    {
        return Model::where('email', $email)
            ->where('id', '!=', $userId)
            ->exists();
    }

    public function getByRoleTeacher()
    {
        return Model::whereHas('roles', function($q){
            $q->where('name', 'Teacher');
        })->orderBy("id", "desc")->get();
    }

    public function getTeacherBySchoolId(string $schoolId)
    {
        return Model::where('school_id', $schoolId)->role('Teacher')->get();
    }


    public function getById(string $id)
    {
        return Model::where("id", $id)->first();
    }

    public function update(string $id, User $user)
    {
        $user->id = $id;
        $user->save();

        return $user;
    }
}
