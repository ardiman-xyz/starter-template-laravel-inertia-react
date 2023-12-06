<?php

namespace App\DTO;

class UserDTO
{
    public string $name;
    public string $email;
    public ?string $emailVerifiedAt = null;
    public string $password;
    public ?string $gender = null;
    public ?string $nip = null;
    public ?string $address = null;
    public ?string $profilePicture = null;
    public ?string $rememberToken = null;

}
