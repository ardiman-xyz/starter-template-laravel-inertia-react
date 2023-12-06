<?php

namespace App\Repositories;

use App\Models\School as Model;

class SchoolRepository
{
    public function getByUserId(string $id)
    {
        return Model::where("user_id", $id)->first();
    }
}
