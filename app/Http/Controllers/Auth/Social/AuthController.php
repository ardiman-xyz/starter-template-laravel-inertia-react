<?php

namespace App\Http\Controllers\Auth\Social;

use App\DTO\AuthDTO;
use App\DTO\UserRegisterDTO;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Repositories\AccountRepository;
use App\Repositories\UserRepository;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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

    public function login(UserLoginRequest $request): JsonResponse
    {
        $data = $request->validationData();

        try {
            $this->authService->authenticateWithCredential($data['email'], $data['password']);
            return response()->json([
                'status' => true,
                'message' => 'Successfully login',
                'data' => $data
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }

    public function register(UserRegisterRequest $request): JsonResponse
    {
        $data = $request->validationData();

        $dto = new UserRegisterDTO();
        $dto->name      = $data['name'];
        $dto->email     = $data['email'];
        $dto->password  = $data['password'];

        try {
            $this->authService->userRegister($dto);
            return response()->json([
                'status' => true,
                'message' => 'Successfully register',
                'data' => $data
            ], 201);
        }catch (Exception $exception)
        {
            return response()->json([
                'success'    => false,
                'message'   => $exception->getMessage()
            ], 400);
        }
    }
}
