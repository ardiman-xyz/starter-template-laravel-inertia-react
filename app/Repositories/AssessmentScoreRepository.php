<?php

namespace App\Repositories;

use App\Entities\ScoredEntity;
use App\Models\AssessmentScore as Model;

class AssessmentScoreRepository
{
    public function findByAssessmentAndItemId(string $assessmentId, string $componentId, string $componentDetailId)
    {
        return Model::where("assessment_id", $assessmentId)
            ->where("component_id", $componentId)
            ->where("component_detail_id", $componentDetailId)
            ->with('assessment', 'component', 'componentDetail')
            ->first();
    }

    public function create(ScoredEntity $entity)
    {
        return Model::create([
            "assessment_id" => $entity->assessmentId,
            "component_id" => $entity->componentId,
            "component_detail_id" => $entity->componentDetailId,
            "score" => $entity->score
        ]);
    }

    public function update(string $id, Model $scored): Model
    {
        $scored->id = $id;
        $scored->save();

        return $scored;
    }
}
