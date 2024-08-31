<?php

namespace App\Services;

use App\DTO\CreateTokenDTO;
use App\DTO\UserLoginDto;
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
        $payload['id']      = $data->id;

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

    public function currentUser(): ?UserLoginDto
    {
        $token = Cookie::get('vistoken');

        if (!$token) {
            return null;
        }

        try {
            $decodedToken = JWT::decode($token, new Key($this->key, 'HS256'));

            return new UserLoginDto(
                isset($decodedToken->id) ? (int)$decodedToken->id : null,
                $decodedToken->name ?? null,
                $decodedToken->email ?? null
            );

        } catch (\Exception $e) {
            return null;
        }
    }

    public function checkToken(): array|string|null
    {
        return Cookie::get('vistoken');
    }

    public function userId()
    {
        $decoded = JWT::decode(Cookie::get('vistoken'), new Key($this->key, 'HS256'));

        return $decoded->id;
    }

    public function verifyJWT(string $token): bool
    {
        try {
            JWT::decode($token, new Key($this->key, 'HS256'));
            return true;

        } catch (Exception $e) {

            return false;

        }
    }

    public function validateJWT(string $token): bool|\stdClass
    {
        try {
            return JWT::decode($token, new Key($this->key, 'HS256'));

        } catch (Exception $e) {

            return false;

        }
    }
}
