<?php

namespace App\Services\Teachers;

use App\Entities\AssessmentAnswerEntity;
use App\Models\AssessmentAnswer;
use App\Models\Component;
use App\Models\User;
use App\Repositories\AssessmentAnswerRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScoreRepository;
use App\Repositories\ComponentDetailRepository;
use App\Repositories\ComponentRepository;
use App\Repositories\UserRepository;
use App\Services\TokenService;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Log;

class VisitationService
{
    private $userId;

    private AssessmentRepository $assessmentRepository;
    private TokenService $tokenService;
    private UserRepository $userRepository;
    private ComponentRepository $componentRepository;
    private ComponentDetailRepository $componentDetailRepository;
    private AssessmentScoreRepository $assessmentScoreRepository;
    private AssessmentAnswerRepository $assessmentAnswerRepository;

    public function __construct(
        AssessmentRepository $assessmentRepository,
        TokenService $tokenService,
        UserRepository $userRepository,
        ComponentRepository $componentRepository,
        ComponentDetailRepository $componentDetailRepository,
        AssessmentScoreRepository $assessmentScoreRepository,
        AssessmentAnswerRepository $assessmentAnswerRepository,
    )
    {
        $this->assessmentRepository = $assessmentRepository;
        $this->tokenService = $tokenService;
        $this->userRepository = $userRepository;
        $this->componentRepository = $componentRepository;
        $this->componentDetailRepository = $componentDetailRepository;
        $this->assessmentScoreRepository = $assessmentScoreRepository;
        $this->assessmentAnswerRepository = $assessmentAnswerRepository;

        $this->userId = $this->tokenService->userId();
    }

    public function getAssessments()
    {
        $user = $this->userRepository->getById($this->userId);

        return $this->assessmentRepository->findBySchoolAndTeacher($user->school_id, $user->id);

    }

    /**
     * @throws Exception
     */
    public function getById(string $assessmentId)
    {
        $assessment = $this->assessmentRepository->getById($assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");

        $userSchoollId = $this->tokenService->getCurrentSchoolId();

        
        
        $components = $this->componentRepository->findAllBySchoolId($userSchoollId);
        $result = [];
        
        foreach ($components as $component) {
            $items = $this->componentDetailRepository->findByComponentId($component->id);
            
            $componentItems = [];
            foreach ($component->details as $item) {
               
                $answer = $this->assessmentScoreRepository->findByAssessmentAndItemId(
                    $assessmentId, 
                    $component->id, 
                    $item->id
                );
                
                
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
        $totalScore = (int)$this->assessmentScoreRepository->totalScore($assessment->id);

        $final_score = $this->calculateFinalScore($totalScore, $sumMaxScore);

        return [
            "instruments" => $result,
            "assessment" => $assessment,
            "component_max_score" => $sumMaxScore,
            "total_score" => $totalScore,
            "final_score" => $final_score
        ];
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

    /**
     * @throws Exception
     */
    public function answer(string $link, string $assessmentId, string $componentId)
    {
        $assessment = $this->assessmentRepository->getById($assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");

        if(!$link) throw new Exception("Link tidak boleh kosong");

        $answer = $this->assessmentAnswerRepository->findByAssessmentId($assessmentId, $componentId);

        $component = Component::find($componentId);

        if(!$component) throw new Exception("Instrument tidak ditemukan");

        if(!$answer)
        {
           return $this->create_answer($link, $assessmentId, $component);
        }else{
            return $this->update_answer($answer, $link);
        }

    }

    /**
     * @throws Exception
     */
    private function create_answer(string $link, string $assessmentId, Component $component)
    {
        try {

            $answerEntity = new AssessmentAnswerEntity();
            $answerEntity->assessmentId = $assessmentId;
            $answerEntity->componentId = $component->id;
            $answerEntity->componentName = $component->name;
            $answerEntity->answer = $link;
            $answerEntity->createdAt = Carbon::now();

            return $this->assessmentAnswerRepository->create($answerEntity);

        } catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    private function update_answer(AssessmentAnswer $model, string $link): AssessmentAnswer
    {
        $model->answer = $link;
        $model->created_at = Carbon::now();

        return $this->assessmentAnswerRepository->update($model->id, $model);
    }
}
