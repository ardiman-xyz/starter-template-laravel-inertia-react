<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AssessmentScore extends Model
{
    use HasFactory;

    protected $table = 'assessment_scores';
    protected $fillable = [
        'assessment_id',
        'component_id',
        'component_detail_id',
        'score'
    ];

    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id', 'id');
    }

    public function component(): BelongsTo
    {
        return $this->belongsTo(Component::class, 'component_id', 'id');
    }

    public function componentDetail():BelongsTo
    {
        return $this->belongsTo(ComponentDetail::class, 'component_detail_id', 'id');
    }
}
