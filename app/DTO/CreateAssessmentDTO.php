<?php

namespace App\DTO;

class CreateAssessmentDTO
{
    public string $teacherId;
    public string $academicYear;
    public string $academicSemester;
    public ?string $title = null;
}
