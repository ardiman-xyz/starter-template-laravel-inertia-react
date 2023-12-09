<?php

namespace App\Entities;

class InstrumentEntity
{
    public string $assessmentStageId;
    public string $name;
    public string $type;
    public string $description;
    public ?string $allowedExtensions = null;
    public ?int $maxSize = null;
    public ?bool $isMultiple = false;
    public ?string $createdAt = null;
    public ?string $updatedAt = null;
}
