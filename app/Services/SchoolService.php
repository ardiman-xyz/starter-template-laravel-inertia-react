<?php

namespace App\Services;

use App\DTO\SchoolDTO;
use App\Entities\SchoolEntity;
use App\Repositories\SchoolRepository;
use Exception;

class SchoolService
{
    private SchoolRepository $schoolRepository;
    private TokenService $tokenService;

    public function __construct(SchoolRepository $schoolRepository, TokenService $tokenService)
    {
        $this->schoolRepository = $schoolRepository;
        $this->tokenService = $tokenService;
    }

    /**
     * @throws Exception
     */
    public function create(SchoolDTO $DTO)
    {
        $entity = new SchoolEntity();
        $entity->userId = $this->tokenService->userId();
        $entity->name = $DTO->name;
        $entity->leaderName = $DTO->leaderName;
        $entity->address = $DTO->address;

        try {

            return $this->schoolRepository->create($entity);

        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function getByUserId()
    {

        $data = $this->schoolRepository->getByUserId($this->tokenService->userId());
        if(!$data) throw new Exception("Data not found");

        return $data;
    }
}
