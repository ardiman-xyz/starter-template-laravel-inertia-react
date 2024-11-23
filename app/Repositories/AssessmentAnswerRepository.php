<?php

namespace App\Repositories;

use App\Entities\AssessmentAnswerEntity;
use App\Models\AssessmentAnswer as Model;

class AssessmentAnswerRepository
{
    public function findByAssessmentId(string $id, string $componentId)
    {
        return Model::where(["assessment_id" =>  $id, "component_id" => $componentId])->first();
    }

    public function create(AssessmentAnswerEntity $entity)
    {
        return Model::create([
           "assessment_id"  => $entity->assessmentId,
           "component_id"   => $entity->componentId,
            "answer"        => $entity->answer,
            "notes"         => $entity->notes,
            "created_at"    => $entity->createdAt,
            "component_name" => $entity->componentName
        ]);
    }

    public function update(string $id, Model $answer)
    {
        $answer->id = $id;
        $answer->save();

        return $answer;
    }
}
