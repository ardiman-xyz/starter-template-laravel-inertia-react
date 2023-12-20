<?php

namespace App\Repositories;

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
}
