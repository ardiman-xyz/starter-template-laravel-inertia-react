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

    public function getByRoleTeacher()
    {
        return Model::whereHas('roles', function($q){
            $q->where('name', 'Teacher');
        })->orderBy("id", "desc")->get();
    }

    public function getById(string $id)
    {
        return Model::where("id", $id)->first();
    }

    public function update(string $id, $data)
    {
        $user = $this->getById($id);

        $user->name = $data->name;
        $user->email = $data->email;
        $user->email_verified_at = $data->emailVerifiedAt;
        $user->password = $data->password;
        $user->gender = $data->gender;
        $user->nip = $data->nip;
        $user->address = $data->address;
        $user->profile_picture = $data->profilePicture;
        $user->remember_token = $data->rememberToken;
        $user->is_password_changed = $data->isPasswordChanged;
        $user->link_invite = $data->linkInvite;

        $user->save();

        return $user;
    }
}
