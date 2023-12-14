<?php

namespace App\DTO;

class UpdateBioDTO
{
    public string $name;
    public string $email;
    public string $gender;
    public ?string $phone = null;
    public ?string $address = null;
    public ?string $nip = null;
}
