<?php

namespace App\Services\Teachers;

use App\Entities\AssessmentAnswerEntity;
use App\Models\AssessmentAnswer;
use App\Repositories\AssessmentAnswerRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScoreRepository;
use App\Repositories\ComponentDetailRepository;
use App\Repositories\ComponentRepository;
use App\Repositories\UserRepository;
use App\Services\TokenService;
use Carbon\Carbon;
use Exception;

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

        $components = $this->componentRepository->findall();
        $result = [];

        foreach ($components as $component) {
            $items = $this->componentDetailRepository->findByComponentId($component->id);

            $componentItems = [];
            foreach ($items as $item) {
                $answer = $this->assessmentScoreRepository->findByAssessmentAndItemId($assessment->id, $component->id, $item->id);
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

        return [
            "instruments" => $result,
            "assessment" => $assessment
        ];
    }

    /**
     * @throws Exception
     */
    public function answer(string $link, string $assessmentId)
    {
        $assessment = $this->assessmentRepository->getById($assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");

        if(!$link) throw new Exception("Link tidak boleh kosong");

        $answer = $this->assessmentAnswerRepository->findByAssessmentId($assessmentId);

        if(!$answer)
        {
           return $this->create_answer($link, $assessmentId);
        }else{
            return $this->update_answer($answer, $link);
        }

    }

    /**
     * @throws Exception
     */
    private function create_answer(string $link, string $assessmentId)
    {
        try {

            $answerEntity = new AssessmentAnswerEntity();
            $answerEntity->assessmentId = $assessmentId;
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
