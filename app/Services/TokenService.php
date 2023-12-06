<?php

namespace App\Services;

use App\DTO\CreateTokenDTO;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Exception;
use Illuminate\Support\Facades\Cookie;

class TokenService
{
    private $key;

    public function __construct()
    {
        $this->key = env("JWT_SECRET");
    }

    public function generate(CreateTokenDTO $data): string
    {
        $payload['name']    = $data->name;
        $payload['email']   = $data->email;

        return JWT::encode($payload, $this->key, 'HS256');
    }

    public function check(): bool
    {
        $token  = Cookie::get('vistoken');

        try {

            JWT::decode($token, new Key($this->key, 'HS256'));
            return true;

        } catch (Exception $e) {

            return false;

        }
    }

    public function currentUser()
    {
        $token  = Cookie::get('vistoken');
        return JWT::decode($token, new Key($this->key, 'HS256'));
    }

    public function checkToken()
    {
        return Cookie::get('vistoken');
    }
}
