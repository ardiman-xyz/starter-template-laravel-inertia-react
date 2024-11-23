<?php

namespace App\Repositories;

use App\Entities\AssessmentEntity;
use App\Models\AssessmentSchedule as Model;

class AssessmentScheduleRepository
{

    public function getById(string $id)
    {
        return Model::find($id);
    }

    public function create(AssessmentEntity $entity)
    {
        return Model::create([
            "assessment_id"         => $entity->assessmentId,
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

    public function update(string $id, Model $schedule)
    {
        $schedule->id = $id;
        $schedule->save();

        return $schedule;
    }

    public function deleteById(string $id)
    {
        return Model::where("id", $id)->delete();
    }
}
