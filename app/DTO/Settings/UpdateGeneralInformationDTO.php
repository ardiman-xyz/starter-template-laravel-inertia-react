<?php

namespace App\DTO\Settings;

class UpdateGeneralInformationDTO
{
    public string $userId;
    public string $name;
    public string $leaderName;
    public string $address;
    public ?string $npsn = null;
    public ?string $educationLevel = null;
    public ?string $status = null;
    public ?string $email = null;
}
