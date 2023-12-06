<?php

namespace App\Services;

use App\DTO\AccountDTO;
use App\DTO\AuthDTO;
use App\DTO\CreateTokenDTO;
use App\DTO\UserDTO;
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
    public function authenticateWithGoogle(AuthDTO $DTO): array
    {
        $isExistUser = $this->accountRepository->getByProviderId($DTO->providerAccountId);

        DB::beginTransaction();

        try {

           if(!$isExistUser)
           {
               $user = new UserDTO();
               $user->name = $DTO->name;
               $user->email = $DTO->email;
               $user->password = bcrypt($DTO->name);
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
}
