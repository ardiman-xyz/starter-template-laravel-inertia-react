<?php

namespace App\Http\Controllers\Auth\Social;

use App\DTO\AuthDTO;
use App\Repositories\AccountRepository;
use App\Repositories\UserRepository;
use App\Services\AuthService;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Socialite\Facades\Socialite;
use Exception;

class AuthController
{
    private AuthService $authService;

    public function __construct()
    {
        $accountRepository = new AccountRepository();
        $userRepository = new UserRepository();
        $this->authService = new AuthService($accountRepository, $userRepository);
    }

    public function create(): Response
    {
        return Inertia::render("Auth/Social/login");
    }

    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * @throws Exception
     */
    public function callback()
    {
        $user = Socialite::driver('google')->user();

        $authData = new AuthDTO();
        $authData->name     = $user->getName();
        $authData->email    = $user->getEmail();
        $authData->avatar   = $user->getAvatar();
        $authData->providerAccountId = $user->getId();
        $authData->provider = "google";

        $response = $this->authService->authenticateWithGoogle($authData);

        return redirect()->route("dashboard");
    }
}
