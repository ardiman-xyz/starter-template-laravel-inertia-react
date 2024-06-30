<?php

namespace App\Services;

use App\DTO\CreateTokenDTO;
use App\DTO\TeacherDTO;
use App\DTO\UpdateTeacherDTO;
use App\DTO\UserDTO;
use App\Models\User;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use Exception;

class TeacherService
{
    private UserRepository $userRepository;
    private TokenService $tokenService;
    private SchoolRepository $schoolRepository;

    public function __construct(UserRepository $userRepository, TokenService $tokenService, SchoolRepository $schoolRepository)
    {
        $this->userRepository = $userRepository;
        $this->tokenService = $tokenService;
        $this->schoolRepository = $schoolRepository;
    }

    /**
     * @throws Exception
     */
    public function getAll()
    {
        $school = $this->schoolRepository->getByUserId($this->tokenService->userId());
        if(!$school)
        {
            throw new Exception("School not found");
        }

        return $this->userRepository->getTeacherBySchoolId($school->id);
    }

    /**
     * @throws Exception
     */
    public function create(TeacherDTO $dto)
    {
        $school = $this->schoolRepository->getByUserId($this->tokenService->userId());
        if(!$school)
        {
            throw new Exception("School not found");
            return;
        }

        $email = $dto->email;

        $isEmailExist = $this->userRepository->getByEmail($email);
        if($isEmailExist) throw new Exception("Email already exist");

        $entity = new UserDTO();
        $entity->name       = $dto->name;
        $entity->email      = $email;
        $entity->password   = bcrypt($dto->password);
        $entity->schoolId   = $school->id;

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

            $teacher->link_invite = $token;
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

    /**
     * @throws Exception
     */
    public function update(TeacherDTO $dto, string $id): User
    {
        $teacher = $this->userRepository->getById($id);

        if(!$teacher) throw new Exception("Data not found");

        $isDuplicateEmail = $this->userRepository->isDuplicateEmail($dto->email, $teacher->id);
        if($isDuplicateEmail)  throw new Exception("Email used another user");

        $teacher->name      = $dto->name;
        $teacher->email     = $dto->email;
        $teacher->password  = $dto->password ? bcrypt($dto->password) : $teacher->password;

        return $this->userRepository->update($teacher->id, $teacher);
    }

    public function getById(string $id)
    {
        $user = $this->userRepository->getById($id);
        if(!$user) throw new Exception("Data not found");

        return $user;
    }


    /**
     * @throws Exception
     */
    public function delete(string $id): void
    {
        $teacher = $this->userRepository->getById($id);

        if(!$teacher) throw new Exception("Data not found");

        $teacher->delete();
    }

}
