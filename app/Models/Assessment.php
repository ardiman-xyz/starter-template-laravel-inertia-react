<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
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
}
