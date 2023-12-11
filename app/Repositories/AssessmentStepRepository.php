<?php

namespace App\Repositories;

use App\Entities\AssessmentStepEntity;
use App\Models\AssessmentSteps as Model;

class AssessmentStepRepository
{
    public function create(AssessmentStepEntity $entity)
    {
        return Model::create([
           "assessment_id"          => $entity->assessmentId,
            "assessment_stage_id"   => $entity->assessmentStageId
        ]);
    }

    public function getByAssessmentId(string $id)
    {
        return Model::where("assessment_id", $id)->get();
    }
}
