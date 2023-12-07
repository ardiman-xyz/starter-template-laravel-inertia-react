<?php

namespace App\Services;

use App\DTO\CreateTokenDTO;
use App\DTO\TeacherDTO;
use App\DTO\UserDTO;
use App\Models\User;
use App\Repositories\UserRepository;
use Exception;

class TeacherService
{
    private UserRepository $userRepository;
    private TokenService $tokenService;

    public function __construct(UserRepository $userRepository, TokenService $tokenService)
    {
        $this->userRepository = $userRepository;
        $this->tokenService = $tokenService;
    }

    public function getAll()
    {
        return $this->userRepository->getByRoleTeacher();
    }

    /**
     * @throws Exception
     */
    public function create(TeacherDTO $dto)
    {
        $email = $dto->email;

        $isEmailExist = $this->userRepository->getByEmail($email);
        if($isEmailExist) throw new Exception("Email already exist");

        $entity = new UserDTO();
        $entity->name       = $dto->name;
        $entity->email      = $email;
        $entity->password   = bcrypt($dto->password);

        try {

            $user = $this->userRepository->create($entity);
            $user->assignRole("Teacher");

            return $user;
        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    public function invitations(string $teacherId)
    {
        $teacher = $this->userRepository->getById($teacherId);

        if(!$teacher) throw new Exception("Teacher not found");

        if($teacher->link_invite === null)
        {
            $token = $this->generateTokenInvite($teacher);

            $teacher->linkInvite = $token;
            $this->userRepository->update($teacherId, $teacher);

            return $this->generateLinkInvite($token);

        }else{

            $isLinkValid = $this->tokenService->verifyJWT($teacher->link_invite);

            if(!$isLinkValid)
            {
                $token = $this->generateTokenInvite($teacher);
                $this->userRepository->update($teacherId, $teacher);
                return $this->generateLinkInvite($token);
            }

            return $this->generateLinkInvite($teacher->link_invite);

        }
    }

    private function generateTokenInvite(User $teacher): string
    {
        $dto = new CreateTokenDTO();
        $dto->id        = $teacher->id;
        $dto->name      = $teacher->name;
        $dto->email     = $teacher->email;

        return $this->tokenService->generate($dto);
    }

    private function generateLinkInvite(string $token)
    {
        return url('/invitation?token='. $token);
    }

}
