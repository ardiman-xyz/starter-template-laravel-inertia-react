<?php

namespace App\Repositories;

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

    public function getByYearSemester(string $year, string $semester)
    {
        return Model::where("year", $year)->where("semester", $semester)->first();
    }
}
