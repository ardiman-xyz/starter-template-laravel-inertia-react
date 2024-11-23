<?php

namespace Database\Seeders;

use App\Models\Component;
use App\Models\ComponentDetail;
use App\Models\User;
use App\Services\TokenService;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cookie;

class ComponentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $tokenService = new TokenService();

        $currentUser = $tokenService->currentUser();

        $user = User::find($currentUser->id);
        $schoolId = $user->school->id;


        $components = [
            [
                'title' => 'Kegiatan Pembukaan Pembelajaran',
                'details' => [
                    'Menyiapkan peserta didik',
                    'Melakukan Apersepsi',
                    'Menyampaikan tujuan pembelajaran',
                    'Penampilan guru',
                ],
            ],
            [
                'title' => 'Kegiatan Inti Pembelajaran',
                'details' => [
                    'Kemampuan guru merumuskan tujuan pembelajaran secara operasional',
                    'Menguasai materi pelajaran',
                    'Melaksanakan pembelajaran sesuai dengan kompetensi yang akan dicapai',
                    'Keterampilan dan kreativitas penggunaan APE serta media pembelajaran',
                    'Menggunakan bahasa yang baik dan benar',
                    'Keterampilan mengelola dan memanfaatkan alam, lingkungan sebagai alat dan sumber belajar',
                    'Sikap dan gaya mengajar guru',
                    'Kemampuan mengorganisir siswa dan mengelola kelas',
                    'Menunjukkan sikap terbuka, menumbuhkan, dan merespon positif partisipasi aktif siswa',
                    'Memahami kepribadian dan perkembangan siswa',
                    'Melaksanakan pembelajaran aktif, inovatif, kreatif, dan menyenangkan',
                ],
            ],
            [
                'title' => 'Kegiatan Penutup Pembelajaran',
                'details' => [
                    'Mendiskusikan kegiatan yang telah dan akan dilaksanakan',
                    'Melakukan penilaian dan refleksi terhadap kegiatan pembelajaran yang sudah dilakukan',
                ],
            ],
        ];

        foreach ($components as $componentData) {
            $component = Component::create([
                'school_id' => $schoolId,
                'name' => $componentData['title']
            ]);

            foreach ($componentData['details'] as $detail) {
                ComponentDetail::create([
                    'component_id' => $component->id,
                    'name' => $detail, 
                    'max_score' => 4, 
                    'description' => null,
                ]);
            }
        }
    }
}
