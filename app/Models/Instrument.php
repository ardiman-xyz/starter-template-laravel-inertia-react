<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Instrument extends Model
{
    use HasFactory;

    protected $table = "instruments";
    protected $guarded = [];

    public function assessmentStage(): BelongsTo
    {
        return $this->belongsTo(AssessmentStage::class, 'assessment_stage_id');
    }

    public function instrumentCriteria(): HasMany
    {
        return $this->hasMany(InstrumentCriteria::class, 'instrument_id');
    }
}
