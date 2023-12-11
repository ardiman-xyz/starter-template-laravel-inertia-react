<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentSteps extends Model
{
    use HasFactory;

    protected $table = "assessment_steps";
    protected $guarded = [];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, "assessment_id");
    }

    public function assessmentStage(): BelongsTo
    {
        return $this->belongsTo(AssessmentStage::class, "assessment_stage_id");
    }
}
