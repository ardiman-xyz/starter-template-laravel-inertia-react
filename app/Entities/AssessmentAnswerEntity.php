<?php

namespace App\Entities;

class AssessmentAnswerEntity
{
    public string $assessmentId;
    public ?int $componentId = null;
    public ?string $componentName = null;
    public string $answer;
    public ?string $notes = null;
    public string $createdAt;
}
