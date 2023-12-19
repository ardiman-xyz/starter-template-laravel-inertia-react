<?php

namespace App\DTO;

class CreateAssessmentDTO
{
    public string $teacherId;
    public string $academicYear;
    public string $academicSemester;
    public ?string $title = null;
    public string $dateStart;
    public string $timeStart;
    public string $dateEnd;
    public string $timeEnd;
}
