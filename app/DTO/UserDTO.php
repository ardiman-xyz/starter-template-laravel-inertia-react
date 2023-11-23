<?php

namespace App\DTO;

class UserDTO
{
    private string $name;
    private string $email;
    private string $password;
    private ?string $role;

    public function __construct($name, $email, $password, ?string $role)
    {
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->role = $role;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }
}
