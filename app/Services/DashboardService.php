<?php

namespace App\Services;

use App\Repositories\SchoolRepository;

class DashboardService
{
    private SchoolRepository $schoolRepository;
    private TokenService $tokenService;

    public function __construct(SchoolRepository $schoolRepository, TokenService $tokenService)
    {
        $this->schoolRepository = $schoolRepository;
        $this->tokenService = $tokenService;
    }

    public function existingData(): bool
    {
        $data = $this->schoolRepository->getByUserId($this->tokenService->userId());

        return $data !== null;
    }
}
