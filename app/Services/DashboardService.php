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

        $categories = DB::table('assessments')
            ->where('school_id', $schoolId)
            ->select('evaluation', DB::raw('count(*) as total'))
            ->groupBy('evaluation')
            ->pluck('total', 'evaluation')
            ->toArray();

        $total = array_sum($categories);

        return collect($categories)->map(function ($count, $name) use ($total) {
            return [
                'name' => $name,
                'value' => $count,
                'percent' => $total > 0 ? round(($count / $total) * 100, 1) : 0
            ];
        })->values();
    }
}
