<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TeachingDevice extends Model
{
    use HasFactory;

    protected $table = 'teaching_devices';
    
    protected $fillable = [
        'assessment_id',
        'name',
        'description',
        'is_required',
        'is_uploaded',
        'file_name',
        'file_path',
        'file_size',
        'file_type',
        'uploaded_at'
    ];

    protected $casts = [
        'is_required' => 'boolean',
        'is_uploaded' => 'boolean',
        'uploaded_at' => 'datetime',
    ];

    /**
     * Relationship to Assessment
     */
    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class, 'assessment_id', 'id');
    }

    /**
     * Get file URL for viewing
     */
    public function getFileUrlAttribute(): ?string
    {
        if ($this->file_path) {
            return asset('storage/' . $this->file_path);
        }
        return null;
    }

    /**
     * Check if device has uploaded file
     */
    public function hasUploadedFile(): bool
    {
        return $this->is_uploaded && !empty($this->file_path);
    }
}