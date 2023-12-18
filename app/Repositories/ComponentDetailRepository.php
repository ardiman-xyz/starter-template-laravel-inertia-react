<?php

namespace App\Repositories;

use App\Entities\ComponentEntity;
use App\Models\ComponentDetail as Model;

class ComponentDetailRepository
{
    public function create(ComponentEntity $entity)
    {
        return Model::create([
            "component_id" => $entity->documentId,
            "name"          => $entity->name,
            "max_score"     => $entity->maxScore
        ]);
    }

    public function findById(string $id)
    {
        return Model::find($id);
    }

    public function update(string $id, Model $componentItem): Model
    {
        $componentItem->id = $id;
        $componentItem->save();

        return $componentItem;
    }

    public function delete(string $id)
    {
        return Model::where("id", $id)->delete();
    }
}
