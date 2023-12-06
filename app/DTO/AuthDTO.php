<?php

namespace App\DTO;

class AuthDTO
{
    public string $name;
    public string $avatar;
    public string $email;
    public string $provider;
    public string $providerAccountId;
    public ?string $refreshToken = null;
    public ?string $accessToken = null;
}
