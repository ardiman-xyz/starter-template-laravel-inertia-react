<?php

namespace App\Http\Controllers;

use App\Models\Assessment;
use App\Models\AssessmentScore;
use App\Models\Component;
use App\Services\TokenService;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{


    public function preview(string $id)
    {

        $assessment = Assessment::with(['school', 'teacher', 'academicSemester', 'assessmentAnswers'])->find($id);
        if(!$assessment) throw new Exception("Assessment not found");


        $components = Component::where("school_id", $assessment->school_id)->with("details")->get();

        $result = [];
        
        foreach ($components as $component) {
            
            $componentItems = [];
            foreach ($component->details as $item) {

                $answer = AssessmentScore::where("assessment_id", $id)
                        ->where("component_id", $component->id)
                        ->where("component_detail_id", $item->id)
                        ->with('assessment', 'component', 'componentDetail')
                        ->first();

                $componentItems[] = [
                    'id' => $item->id,
                    'name' => $item->name,
                    'scored' => [
                        'status' => (bool)$answer,
                        'score' => $answer ? $answer->score : null,
                    ],
                ];
            }
    
            $result[] = [
                'id' => $component->id,
                'name' => $component->name,
                'details' => $componentItems,
            ];
        }

        $components = Component::where("school_id", $assessment->school_id)
                ->withSum('details', 'max_score')
                ->get();
        $sumMaxScore = $components->sum('details_sum_max_score');
        $totalScore = AssessmentScore::where("assessment_id", $id)->sum("score");

        $final_score = $this->calculateFinalScore($totalScore, $sumMaxScore);

        $data = [
            "instruments" => $result,
            "assessment" => $assessment,
            "component_max_score" => $sumMaxScore,
            "total_score" => $totalScore,
            "final_score" => $final_score
        ];


       return Inertia::render("Visitation/Report", [
         "data" => $data
       ]);
    }


    public function bulkReport(Request $request)
    {
        $assessmentIds = $request->input('ids', []);
        
        $bulkData = [];
        
        foreach ($assessmentIds as $id) {
            $assessment = Assessment::with(['school', 'teacher', 'academicSemester', 'assessmentAnswers'])
                ->find($id);
                
            if (!$assessment) continue;
    
            $components = Component::where("school_id", $assessment->school_id)
                ->with("details")
                ->get();
    
            $result = [];
            
            foreach ($components as $component) {
                $componentItems = [];
                foreach ($component->details as $item) {
                    $answer = AssessmentScore::where("assessment_id", $id)
                        ->where("component_id", $component->id)
                        ->where("component_detail_id", $item->id)
                        ->with('assessment', 'component', 'componentDetail')
                        ->first();
    
                    $componentItems[] = [
                        'id' => $item->id,
                        'name' => $item->name,
                        'scored' => [
                            'status' => (bool)$answer,
                            'score' => $answer ? $answer->score : null,
                        ],
                    ];
                }
    
                $result[] = [
                    'id' => $component->id,
                    'name' => $component->name,
                    'details' => $componentItems,
                ];
            }
    
            $componentsWithSum = Component::where("school_id", $assessment->school_id)
                ->withSum('details', 'max_score')
                ->get();
            $sumMaxScore = $componentsWithSum->sum('details_sum_max_score');
            $totalScore = AssessmentScore::where("assessment_id", $id)->sum("score");
    
            $final_score = $this->calculateFinalScore($totalScore, $sumMaxScore);
    
            $bulkData[] = [
                "instruments" => $result,
                "assessment" => $assessment,
                "component_max_score" => $sumMaxScore,
                "total_score" => $totalScore,
                "final_score" => $final_score
            ];
        }
    
        return Inertia::render('Visitation/BulkReport', [
            'data' => $bulkData
        ]);
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
