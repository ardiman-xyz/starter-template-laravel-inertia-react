<?php

namespace App\DTO\Settings;

class UpdatePasswordUserDto
{
    public string $schoolId;
    public string $userId;
    public string $oldPassword;
    public string $newPassword;
}
