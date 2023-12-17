<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class InstrumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "name"   => "Kegiatan Pembukaan Pembelajaran",
            ],
            [
                "name"   => "Kegiatan Inti Pembelajaran",
            ],
            [
                "name"   => "Kegiatan Penutup Pembelajaran",
            ]
        ];
    }
}
