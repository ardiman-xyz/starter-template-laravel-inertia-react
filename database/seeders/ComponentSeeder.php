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
                'title' => 'Kegiatan Pendahuluan',
                'details' => [
                    'Menyiapkan peserta didik secara fisik dan psikis dimulai dari kedatangan dengan menyapa dan memberi salam',
                    'Guru menyampaikan rencana kegiatan baik individual, kerja kelompok dan melakukan observasi serta menyampaikan tujuan',
                    'Melakukan apersepsi: mengaitkan materi dengan pembelajaran sebelumnya dan mendemonstrasikan sesuatu yang terkait dengan materi pembelajaran',
                    'Penampilan guru',
                ],
            ],
            [
                'title' => 'Kegiatan inti',
                'details' => [
                    'Menguasai materi pelajaran',
                    'Menyesuaikan materi dengan tujuan pembelajaran',
                    'Mengaitkan materi dengan pengetahuan lain yang relevan dengan lingkungan sekitar, perkembangan iptek dan kehidupan nyata',
                    'Menyajikan materi dengan tepat dan sistematis',
                    'Melaksanakan pembelajaran sesuai dengan kompetensi yang akan dicapai dan bersifat kontekstual',
                    'Melaksanakan pembelajaran yang menumbuhkan partisipasi aktif peserta didik',
                    'Melaksanakan pembelajaran sesuai dengan alokasi waktu yang direncanakan',
                    'Melaksanakan pembelajaran yang mengasah kemampuan Creativity peserta didik (aktifitas HOST)',
                    'Melaksanakan pembelajaran yang mengasah kemampuan Critical Thinking peserta didik (aktifitas HOST)',
                    'Melaksanakan pembelajaran yang mengasah kemampuan Communication peserta didik (aktifitas HOST)',
                    'Melaksanakan pembelajaran yang mengasah kemampuan Collaboration peserta didik (Aktifitas HOST)',
                    'Menciptakan suasana yang kondusif dan disiplin positif dalam menegakan aturan kelas yang telah disepakati bersama',
                    'Menunjukan keterampilan dalam penggunaan sumber belajar yang bervariasi',
                    'Menunjukan keterampilan dalam penggunaan media pembelajaran',
                    'Menggunakan bahasa secara jelas dan benar',
                ],
            ],
            [
                'title' => 'Kegiatan Penutup',
                'details' => [
                    'Menunjukkan aktivitas belajar yang bertujuan meningkatkan pengetahuan dan keterampilan mengajar',
                    'Melaksanakan penilaian sikap, pengetahuan dan keterampalan peserta didik',
                    'Melakukan refleksi terhadap kegiatan yang telah dilaksanakan dan menyampaikan kegiatan yang akan dilaksanakan',
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