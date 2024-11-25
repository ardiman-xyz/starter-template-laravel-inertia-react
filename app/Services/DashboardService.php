<?php

namespace App\Services;

use App\Repositories\SchoolRepository;
use Illuminate\Support\Facades\DB;

class DashboardService
{

    public function __construct(
       protected SchoolRepository $schoolRepository,
        protected TokenService $tokenService
    ){}

    public function existingData(): bool
    {
        $data = $this->schoolRepository->getByUserId($this->tokenService->userId());

        return $data !== null;
    }


    public function getTrendVisitationTeacher()
    {
        $schoolId = $this->schoolRepository->getByUserId($this->tokenService->userId())->id;


        return DB::table('assessments')
            ->join('academic_semesters', 'assessments.academic_semester_id', '=', 'academic_semesters.id')
            ->join('assessment_scores', 'assessments.id', '=', 'assessment_scores.assessment_id')
            ->where('assessments.school_id', $schoolId)
            ->select(
                'academic_semesters.year',
                'academic_semesters.semester',
                DB::raw('AVG(assessments.final_score) as average_score')
            )
            ->groupBy('academic_semesters.year', 'academic_semesters.semester')
            ->get()
            ->groupBy('year')
            ->map(function ($yearGroup) {
                $ganjil = $yearGroup->where('semester', 'ganjil')->first();
                $genap = $yearGroup->where('semester', 'genap')->first();
                return [
                    'year' => (int) $yearGroup->first()->year,
                    'ganjil' => $ganjil ? round($ganjil->average_score, 1) : 0,
                    'genap' => $genap ? round($genap->average_score, 1) : 0,
                ];
            })
            ->values();
    }

    public function getCategoryDistribution()
    {
        $schoolId = $this->schoolRepository->getByUserId($this->tokenService->userId())->id;

        $assessments = DB::table('assessments as a')
            ->join('assessment_scores as scores', 'a.id', '=', 'scores.assessment_id')
            ->where('a.school_id', $schoolId)
            ->select(
                'a.id',
                DB::raw('AVG(scores.score) as average_score')
            )
            ->groupBy('a.id')
            ->get()
            ->map(function($item) {
                $score = ($item->average_score / 4) * 100; // Konversi ke skala 100
                
                // Kategorisasi berdasarkan nilai
                $category = match(true) {
                    $score >= 90 => 'Sangat Baik',
                    $score >= 80 => 'Baik',
                    $score >= 70 => 'Cukup',
                    default => 'Kurang'
                };

                return [
                    'score' => $score,
                    'category' => $category
                ];
            });

        // Hitung distribusi kategori
        $distribution = $assessments->groupBy('category')
            ->map(function($items) use($assessments) {
                $count = $items->count();
                $total = $assessments->count();
                
                return [
                    'value' => $count,
                    'percent' => $total > 0 ? round(($count / $total) * 100, 1) : 0
                ];
            });

        // Format final response
        return collect([
            [
                'name' => 'Sangat Baik',
                'value' => $distribution['Sangat Baik']['value'] ?? 0,
                'percent' => $distribution['Sangat Baik']['percent'] ?? 0,
                'color' => '#50B88A' // green
            ],
            [
                'name' => 'Baik',
                'value' => $distribution['Baik']['value'] ?? 0,
                'percent' => $distribution['Baik']['percent'] ?? 0,
                'color' => '#2762D9' // blue
            ],
            [
                'name' => 'Cukup',
                'value' => $distribution['Cukup']['value'] ?? 0,
                'percent' => $distribution['Cukup']['percent'] ?? 0,
                'color' => '#E88C31' // yellow
            ],
            [
                'name' => 'Kurang',
                'value' => $distribution['Kurang']['value'] ?? 0,
                'percent' => $distribution['Kurang']['percent'] ?? 0,
                'color' => '#E44B70' // red
            ]
        ])->filter(function($category) {
            return $category['value'] > 0;  // Hanya tampilkan kategori yang ada nilainya
        })->values();
    }
}
