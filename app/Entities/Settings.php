<?php

namespace App\Entities;

class Settings
{
    public ?int $id = null;
    public string $userId;
    public string $name;
    public string $leaderName;
    public string $address;
    public ?string $npsn = null;
    public ?string $educationLevel = null;
    public ?string $status = null;
    public ?string $email = null;
    public ?string $schoolImage = null;
}
