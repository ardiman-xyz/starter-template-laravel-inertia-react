<?php

namespace App\Repositories;

use App\DTO\UserDTO;
use App\Models\User as Model;

class UserRepository
{
    public function create(UserDTO $data)
    {
        return Model::create([
            "name"              => $data->name,
            "email"             => $data->email,
            "email_verified_at" => $data->emailVerifiedAt,
            "password"          => $data->password,
            "gender"            => $data->gender,
            "nip"               => $data->nip,
            "address"           => $data->address,
            "profile_picture"   => $data->profilePicture,
            "remember_token"    => $data->rememberToken
        ]);
    }

    public function getByEmail(string $email)
    {
        return Model::where("email", $email)->first();
    }
}
