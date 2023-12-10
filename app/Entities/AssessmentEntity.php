<?php

namespace App\Entities;

class AssessmentEntity
{
    public string $schoolId;
    public string $teacherId;
    public string $academicSemesterId;
    public ?string $title = null;
}
