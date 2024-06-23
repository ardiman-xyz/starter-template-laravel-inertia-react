<?php

namespace App\Entities;

class AssessmentEntity
{
    public string $schoolId;
    public string $assessmentId;
    public string $instrumentId;
    public string $teacherId;
    public string $academicSemesterId;
    public ?string $title = null;
    public string $status = "schedule";
    public int $finalScore;
    public ?string $evaluation = null;
    public string $startedAt;
    public string $finishedAt;
}
