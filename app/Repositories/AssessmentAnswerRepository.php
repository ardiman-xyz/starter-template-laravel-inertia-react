<?php

namespace App\Repositories;

use App\Entities\AssessmentAnswerEntity;
use App\Models\AssessmentAnswer as Model;

class AssessmentAnswerRepository
{
    public function findByAssessmentId(string $id)
    {
        return Model::where("assessment_id", $id)->first();
    }

    public function create(AssessmentAnswerEntity $entity)
    {
        return Model::create([
           "assessment_id"  => $entity->assessmentId,
           "component_id"   => $entity->componentId,
            "answer"        => $entity->answer,
            "notes"         => $entity->notes,
            "created_at"    => $entity->createdAt
        ]);
    }

    public function update(string $id, Model $answer)
    {
        $answer->id = $id;
        $answer->save();

        return $answer;
    }
}
