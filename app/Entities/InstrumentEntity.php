<?php

namespace App\Entities;

class InstrumentEntity
{
    public string $assessmentStageId;
    public string $name;
    public string $type;
    public ?string $createdAt = null;
    public ?string $updatedAt = null;
}
