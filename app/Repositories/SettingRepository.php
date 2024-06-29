<?php

namespace App\Repositories;

use App\Models\School as Model;

class SettingRepository
{

    public function findById(string $id): ?Model
    {
        return Model::find($id);
    }
}
