<?php

namespace App\Entities;

class InstrumentCriteriaEntity
{
    public string $instrumentId;
    public string $title;
    public int $maxScore;
    public ?string $created_at = null;
    public ?string $updatedAt = null;
}
