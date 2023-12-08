<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AssessmentStage extends Model
{
    use HasFactory;

    protected $table = "assessment_stages";
    protected $guarded = [];

    public function instruments(): HasMany
    {
        return $this->hasMany(Instrument::class, 'assessment_stage_id');
    }
}
