<?php

namespace App\DTO;

class CreateInstrumentDTO
{
    public string $assessmentStageId;
    public string $name;
    public string $type;
    public string $description;
    public ?array $allowedExtensions =[];
    public ?string $maxSize = null;
    public ?string $isMultiple = null;
}
