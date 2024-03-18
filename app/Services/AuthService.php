<?php

namespace App\Services;

use App\DTO\AccountDTO;
use App\DTO\AuthDTO;
use App\DTO\CreateTokenDTO;
use App\DTO\UserDTO;
use App\DTO\UserRegisterDTO;
use App\Entities\AccountEntity;
use App\Repositories\AccountRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;

class AuthService
{
    private AccountRepository $accountRepository;
    private UserRepository $userRepository;
    private TokenService $tokenService;

    public function __construct(AccountRepository $accountRepository, UserRepository $userRepository)
    {
        $this->accountRepository = $accountRepository;
        $this->userRepository = $userRepository;
        $this->tokenService = new TokenService();
    }

    /**
     * @throws Exception
     */
    public function authenticateWithCredential(string $email, string $password)
    {
        $user = $this->userRepository->getByEmail($email);

        if(!$user) throw new Exception("Username or password wrong!");

        if (!password_verify($password, $user->password)) throw new Exception("Email or password wrong!");

        $newPayload = new CreateTokenDTO();
        $newPayload->id     = $user->id;
        $newPayload->email  = $email;
        $newPayload->name   = $user->name;

        $token = $this->tokenService->generate($newPayload);
        Cookie::queue("vistoken", $token, 1440);

        return $user['role'] = $user->getRoleNames()[0];
    }

    /**
     * @throws Exception
     */
    public function authenticateWithGoogle(AuthDTO $DTO)
    {
        $isExistUser = $this->accountRepository->getByProviderId($DTO->providerAccountId);

        DB::beginTransaction();

        try {

           if(!$isExistUser)
           {
               $user = new UserDTO();
               $user->name = $DTO->name;
               $user->email = $DTO->email;
               $user->profilePicture = $DTO->avatar;

               $response = $this->userRepository->create($user);
               $response->assignRole("Headmaster");

               $account = new AccountEntity();
               $account->userId = $response->id;
               $account->providerAccountId = $DTO->providerAccountId;
               $account->provider  = $DTO->provider;

               $this->accountRepository->create($account);
           }

            $newPayload = new CreateTokenDTO();
            $newPayload->id    = $isExistUser->user->id;
            $newPayload->email = $DTO->email;
            $newPayload->name = $DTO->name;

            $token = $this->tokenService->generate($newPayload);
            Cookie::queue("vistoken", $token, 1440);

            DB::commit();

            return [
                "token"     => $token
            ];
        }catch (Exception $exception)
        {
            DB::rollBack();
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function userRegister(UserRegisterDTO $DTO)
    {

        $isEmailExist = $this->userRepository->getByEmail($DTO->email);
        if($isEmailExist) throw new Exception("Email exist");

        DB::beginTransaction();

        try {
            $user = new UserDTO();
            $user->name = $DTO->name;
            $user->email = $DTO->email;
            $user->password = bcrypt($DTO->password);

            $response = $this->userRepository->create($user);
            $response->assignRole("Headmaster");

            $newPayload = new CreateTokenDTO();
            $newPayload->id     = $response->id;
            $newPayload->email = $DTO->email;
            $newPayload->name = $DTO->name;

            $token = $this->tokenService->generate($newPayload);

            Cookie::queue("vistoken", $token, 1440);

            DB::commit();

        }catch (Exception $exception)
        {
            DB::rollBack();
            throw new $exception;
        }

    }

}
