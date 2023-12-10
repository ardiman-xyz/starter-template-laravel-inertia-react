<?php

namespace App\Services;

use App\Repositories\AcademicSemesterRepository;
use Exception;

class VisitationService
{
    private AcademicSemesterRepository $academicSemesterRepository;

    public function __construct(AcademicSemesterRepository $academicSemesterRepository)
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
    }

    public function getAcademicSemester()
    {
        return $this->academicSemesterRepository->findAll();
    }

    public function getFilterByAcademicSemester(string $year, string $semester)
    {
        $year = $this->academicSemesterRepository->getByYearSemester($year, $semester);

        if(!$year) throw new Exception("Year and semester not found");

        return $year;

    }
}
