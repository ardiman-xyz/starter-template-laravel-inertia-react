<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentScore;
use App\Models\Component;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class WebController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Welcome', []);
    }

    public function validateReport(string $id)
    {

        $assessment = Assessment::with(['school', 'teacher', 'academicSemester', 'assessmentAnswers'])->find($id);
        if(!$assessment) throw new Exception("Assessment not found");


        $components = Component::where("school_id", $assessment->school_id)
                        ->withSum('details', 'max_score')
                        ->get();

        $sumMaxScore = $components->sum('details_sum_max_score');
        $totalScore = AssessmentScore::where("assessment_id", $id)->sum("score");

        $final_score = $this->calculateFinalScore($totalScore, $sumMaxScore);


        $data = [
            "assessment" => $assessment,
            "component_max_score" => $sumMaxScore,
            "total_score" => $totalScore,
            "final_score" => $final_score
        ];

        return Inertia::render("ReportValidation", compact("data"));
    }


    public function calculateFinalScore(int $score, int $max_score): array
    {
        $final_score = ($score / $max_score) * 100;
        $final_score = ceil($final_score);

        return [
            "final_score" => $final_score,
            "evaluate" => $this->evaluateAchievement($final_score),
        ];
    }

    private function evaluateAchievement(int $finalScore): string
    {

        if($finalScore >= 86) {
            return 'Baik Sekali';
        } elseif($finalScore >= 70) {
            return 'Baik';
        } elseif($finalScore >= 55) {
            return 'Cukup';
        } else {
            return 'Kurang';
        }
    }
}
