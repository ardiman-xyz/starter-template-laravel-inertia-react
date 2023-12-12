<?php

namespace App\Entities;
use DateTime;

class AssessmentScheduleEntity
{
    public string $assessmentId;
    public string $assessmentStageId;
    public string $instrumentId;
    public string $status;
    public DateTime $startedAt;
    public DateTime $finishedAt;
}
