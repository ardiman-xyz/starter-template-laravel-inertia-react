<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Assessment;
use App\Models\AssessmentScore;
use App\Models\Component;
use App\Services\Teachers\VisitationService;
use App\Services\TokenService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Spatie\Browsershot\Browsershot;
use Spatie\Browsershot\Exceptions\CouldNotTakeBrowsershot;
use Spatie\LaravelPdf\Facades\Pdf;
use function Spatie\LaravelPdf\Support\pdf;

class ReportController extends Controller
{
    private TokenService $tokenService;

    public function __construct()
    {
        $this->tokenService = new TokenService();
    }


    /**
     * @throws CouldNotTakeBrowsershot
     */
    public function index(Request $request)
    {

        $html = view('preview')->render();

        $nodePath = trim(shell_exec('which node'));

        $npmPath = trim(shell_exec('which npm'));

        Browsershot::html($html)
            ->showBackground()
            ->setNodeBinary($nodePath)
            ->setNpmBinary($npmPath)
            ->save(storage_path("/app/reports/example.pdf"));
    }

    public function preview(string $id)
    {

        $assessment = Assessment::with(['school', 'teacher', 'academicSemester', 'assessmentAnswers'])->find($id);
        if(!$assessment) throw new Exception("Assessment not found");


        $userSchoollId = $this->tokenService->getCurrentSchoolId();

        $components = Component::where("school_id", $userSchoollId)->with("details")->get();

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

        $components = Component::where("school_id", $userSchoollId)
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


       return Inertia::render("Teachers/Report/Preview", [
         "data" => $data
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
