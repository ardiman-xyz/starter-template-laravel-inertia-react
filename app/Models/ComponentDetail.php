<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ComponentDetail extends Model
{
    use HasFactory;

    protected $table = "component_details";
    protected $guarded = [];

    public function component(): BelongsTo
    {
        return $this->belongsTo(Component::class, "component_id");
    }
}
