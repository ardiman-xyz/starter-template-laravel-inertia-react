<?php

namespace App\Repositories;

use App\Entities\AssessmentEntity;
use App\Models\Assessment as Model;

class AssessmentRepository
{
    public function findBySchoolAndSemester(string $schoolId, string $academicSemesterId)
    {
        return Model::where("school_id", $schoolId)
            ->where("academic_semester_id", $academicSemesterId)
            ->with('teacher')
            ->get();
    }

    public function create(AssessmentEntity $entity)
    {
        return Model::create([
            "school_id"     => $entity->schoolId,
            "teacher_id"    => $entity->teacherId,
            "academic_semester_id" => $entity->academicSemesterId,
            "title" => $entity->title
        ]);
    }

    public function getById(string $id)
    {
        return Model::find($id);
    }

    public function deleteById(string $id)
    {
        return Model::where("id", $id)->delete();
    }
}
