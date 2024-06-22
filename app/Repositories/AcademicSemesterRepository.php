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
            ->select('year')
            ->groupBy('year')
            ->get();
    }

    public function getAll()
    {
        return Model::latest()->get();
    }

    public function getByYearSemester(string $year, string $semester)
    {
        return Model::where("year", $year)->where("semester", $semester)->first();
    }

    public function academicAlreadyExists(string $year, string $semester, string $academic_year): bool
    {
        return Model::where('year', $year)
            ->where('semester', $semester)
            ->where('academic_year', $academic_year)
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
