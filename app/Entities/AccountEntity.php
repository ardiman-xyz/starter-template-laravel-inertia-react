<?php

namespace App\Entities;

class AccountEntity
{
    public string $userId;
    public string $provider;
    public string $providerAccountId;
    public ?string $refreshToken = null;
    public ?string $accessToken = null;
}
