<?php

namespace Database\Seeders;

use App\Models\AcademicSemester;
use App\Models\AssessmentStage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AcademicYearSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "year" => "2023/2024",
                "semester" => "Ganjil"
            ],
            [
                "year" => "2023/2024",
                "semester" => "Genap"
            ]
        ];

        AcademicSemester::insert($data);
    }
}
