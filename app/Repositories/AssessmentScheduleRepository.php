<?php

namespace App\Repositories;

use App\Entities\AssessmentScheduleEntity;
use App\Models\AssessmentSchedule as Model;

class AssessmentScheduleRepository
{
    public function create(AssessmentScheduleEntity $entity)
    {
        return Model::create([
            "assessment_id"         => $entity->assessmentId,
            "assessment_stage_id"   => $entity->assessmentStageId,
            "instrument_id"         => $entity->instrumentId,
            "status"                => $entity->status,
            "started_at"            => $entity->startedAt,
            "finished_at"            => $entity->finishedAt,
        ]);
    }

    public function getBySchedule(string $assessment_id, string $stage_id, string $instrument_id)
    {
        return Model::where("assessment_id", $assessment_id)
                    ->where("assessment_stage_id", $stage_id)
                    ->where("instrument_id", $instrument_id)
                    ->first();
    }
}
