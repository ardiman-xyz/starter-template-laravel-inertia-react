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
            "type"  => $entity->type,
            "description" => $entity->description,
            "allowed_extension" => $entity->allowedExtensions,
            "max_size"      => $entity->maxSize,
            "is_multiple"   => $entity->isMultiple
        ]);
    }

    public function getById(string $id)
    {
        return Model::find($id);
    }

    public function getAssessmentStageId(string $stageId)
    {
        return Model::where("assessment_stage_id", $stageId)->get();

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
