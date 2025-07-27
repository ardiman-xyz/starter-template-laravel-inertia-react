<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Str;

class Assessment extends Model
{
    use HasFactory;

    protected $table = "assessments";
    protected $guarded = [];
    public $keyType = "string";
    public $primaryKey = "id";
    public $incrementing = false;

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = Str::uuid();
        });
    }

    public function teacher(): BelongsTo
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function academicSemester(): BelongsTo
    {
        return $this->belongsTo(AcademicSemester::class, "academic_semester_id");
    }

    public function school(): BelongsTo
    {
        return $this->belongsTo(School::class, "school_id");
    }

    public function assessmentAnswers(): HasMany
    {
        return $this->hasMany(AssessmentAnswer::class, 'assessment_id', 'id');
    }

    public function assessmentScores(): HasMany
    {
        return $this->hasMany(AssessmentScore::class, 'assessment_id', 'id');
    }

     // NEW: Relationship to Teaching Devices
    public function teachingDevices(): HasMany
    {
        return $this->hasMany(TeachingDevice::class, 'assessment_id', 'id');
    }

    // NEW: Get main teaching device (Perangkat Pembelajaran)
    public function teachingDevice(): HasOne
    {
        return $this->hasOne(TeachingDevice::class, 'assessment_id', 'id')
                    ->where('name', 'Perangkat Pembelajaran');
    }
}
