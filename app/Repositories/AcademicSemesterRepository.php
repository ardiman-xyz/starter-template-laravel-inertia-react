<?php

namespace App\Repositories;

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

    public function getAll()
    {
        return Model::latest()->get();
    }

    public function getByYearSemester(string $academic_year, string $semester)
    {
        return Model::where("academic_year", $academic_year)->where("semester", $semester)->first();
    }

    public function getById(int $id)
    {
        return Model::find($id);
    }

    public function academicAlreadyExists(string $year, string $semester, string $academic_year): bool
    {
        return Model::where('year', $year)
            ->where('semester', $semester)
            ->where('academic_year', $academic_year)
            ->exists();
    }

    public function academicAlreadyExistsExcept(string $year, string $semester, string $academicYear, int $id): bool
    {
        return Model::where('year', $year)
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->where('id', '<>', $id)
            ->exists();
    }

    public function save(AcademicSemester $data)
    {
        return Model::create([
            "year" => $data->year,
            "academic_year" => $data->academicYear,
            "semester" => $data->semester,
            "start_date" => $data->startDate,
            "end_date" => $data->endDate,
        ]);
    }
}
