<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Component extends Model
{
    use HasFactory;

    protected $table = "components";
    protected $guarded = [];

    public function details(): HasMany
    {
        return $this->hasMany(ComponentDetail::class, "component_id");
    }

    public function assessmentAnswers(): HasMany
    {
        return $this->hasMany(AssessmentAnswer::class, 'component_id', 'id');
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class);
    }

    public function scopeForSchool($query, $schoolId = null)
   {
       return $query->where('school_id', $schoolId ?: auth()->user()->school_id);
   }

}
