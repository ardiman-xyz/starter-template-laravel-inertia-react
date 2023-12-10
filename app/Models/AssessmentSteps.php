<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssessmentSteps extends Model
{
    use HasFactory;

    protected $table = "assessment_steps";
    protected $guarded = [];
}
