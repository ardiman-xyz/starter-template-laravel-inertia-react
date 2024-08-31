<?php

namespace App\Repositories;

use App\Entities\SchoolEntity;
use App\Models\School as Model;

class SchoolRepository
{
    public function create(SchoolEntity $entity)
    {
        return Model::create([
            "user_id"        => $entity->userId,
            "name"           => $entity->name,
            "leader_name"   => $entity->leaderName,
            "address"       => $entity->address
        ]);
    }

    public function getByUserId(string $id)
    {
        return Model::where("user_id", $id)->first();
    }

    public function getById(string $id)
    {
        return Model::find($id);
    }
}
