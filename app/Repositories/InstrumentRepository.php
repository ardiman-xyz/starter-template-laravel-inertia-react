<?php

namespace App\Repositories;

use App\Entities\InstrumentEntity;
use App\Models\Instrument as Model;

class InstrumentRepository
{

    public function getAll()
    {
        return Model::orderBy("id","desc")->get();
    }

    public function create(InstrumentEntity $entity)
    {
        return Model::create([
            "assessment_stage_id" => $entity->assessmentStageId,
            "name"  => $entity->name,
            "type"  => $entity->type
        ]);
    }

    public function getById(string $id)
    {
        return Model::find($id);
    }

    public function update(string $id, Model $instrument)
    {
        $instrument->id = $id;
        $instrument->save();

        return $instrument;
    }

    public function delete(string $id): ?bool
    {
        return Model::find($id)->delete();
    }

}
