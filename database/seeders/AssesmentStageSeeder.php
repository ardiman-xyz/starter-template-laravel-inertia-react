<?php

namespace Database\Seeders;

use App\Models\AssessmentStage;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssesmentStageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name"   => "pra observasi",
            ],
            [
                "name"   => "observasi",
            ],
            [
                "name"   => "pasca observasi",
            ]
        ];

        AssessmentStage::insert($data);
    }
}
