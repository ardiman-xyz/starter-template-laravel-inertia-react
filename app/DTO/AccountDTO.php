<?php

namespace App\DTO;

class AccountDTO
{
    public string $userId;
    public string $name;
    public string $avatar;
    public string $email;
    public string $provider;
    public string $providerAccountId;
    public ?string $refreshToken = null;
    public ?string $accessToken = null;
}
