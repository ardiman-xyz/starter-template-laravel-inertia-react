<?php

namespace App\Repositories;

use App\Models\AssessmentStage as Model;

class AssessmentStageRepository
{

    public function getAll()
    {
        return Model::all();
    }

    public function create(string $name)
    {
        return Model::create([
           "name"   => $name
        ]);
    }

    public function getById(string $id): ?Model
    {
        return Model::find($id);
    }

}
