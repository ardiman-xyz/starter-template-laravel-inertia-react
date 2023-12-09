<?php

namespace App\Repositories;

use App\Entities\InstrumentCriteriaEntity;
use App\Models\InstrumentCriteria as Model;

class InstrumentCriteriaRepository
{
    public function getByInstrumentId(string $id)
    {
        return Model::where('instrument_id', $id)->get();
    }

    public function create(InstrumentCriteriaEntity $entity)
    {
        return Model::create([
            "instrument_id" => $entity->instrumentId,
            "title"         => $entity->title,
            "max_score"     => $entity->maxScore
        ]);
    }

    public function getById(string $id)
    {
        return Model::find($id);
    }

    public function update(string $id, Model $criteria)
    {
        $criteria->id = $id;
        $criteria->save();

        return $criteria;
    }

    public function deleteById(string $id)
    {
        return Model::where("id", $id)->delete();
    }

}
