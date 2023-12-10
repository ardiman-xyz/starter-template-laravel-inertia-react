<?php

namespace App\Services;

use App\Repositories\AcademicSemesterRepository;

class AcademicSemesterService
{
    private AcademicSemesterRepository $academicSemesterRepository;

    public function __construct(AcademicSemesterRepository $academicSemesterRepository)
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
    }

    public function getaAll()
    {
        return $this->academicSemesterRepository->findAll();
    }

}
