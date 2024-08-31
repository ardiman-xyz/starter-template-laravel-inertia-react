<?php

namespace App\Repositories;

use App\DTO\AcademicCreateDTO;
use App\Entities\AcademicSemester;
use App\Models\AcademicSemester as Model;
use Illuminate\Support\Facades\DB;

class AcademicSemesterRepository
{
    public function findAll()
    {
        return DB::table('academic_semesters')
            ->select('academic_year')
            ->distinct()
            ->get();
    }

    public function findBySchoolId(string $id)
    {
        return DB::table('academic_semesters')
            ->select('academic_year')
            ->where("school_id", $id)
            ->distinct()
            ->get();
    }

    public function getAll()
    {
        return Model::latest()->get();
    }

    public function getBySchoolId(string $id) {
        return Model::where("school_id", $id)->get();
    }

    public function getByYearSemester(string $academic_year, string $semester, string $schoolId)
    {
        return Model::where("school_id", $schoolId)
                ->where("academic_year", $academic_year)
                ->where("semester", $semester)
                ->first();
    }

    public function getById(int $id)
    {
        return Model::find($id);
    }

    public function academicAlreadyExists(AcademicCreateDTO $data): bool
    {
        return Model::where('year', $data->year)
            ->where("school_id", $data->schoolId)
            ->where('semester', $data->semester)
            ->where('academic_year', $data->academicYear)
            ->exists();
    }

    public function academicAlreadyExistsExcept(AcademicCreateDTO $data, string $id): bool
    {
        return Model::where('year', $data->year)
                ->where("school_id", $data->schoolId)
                ->where('semester', $data->semester)
                ->where('academic_year', $data->academicYear)
                ->where('id', '<>', $id)
                ->exists();
    }

    public function save(AcademicSemester $data)
    {
        return Model::create([
            "school_id" => $data->schoolId,
            "year" => $data->year,
            "academic_year" => $data->academicYear,
            "semester" => $data->semester,
            "start_date" => $data->startDate,
            "end_date" => $data->endDate,
        ]);
    }
}
