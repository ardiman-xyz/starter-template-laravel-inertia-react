<?php

namespace App\Services\Teachers;

use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScheduleRepository;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\InstrumentRepository;
use App\Repositories\UserRepository;
use App\Services\TokenService;
use Exception;

class VisitationService
{
    private $userId;

    private AssessmentRepository $assessmentRepository;
    private AssessmentStageRepository $assessmentStageRepository;
    private TokenService $tokenService;
    private UserRepository $userRepository;
    private InstrumentRepository $instrumentRepository;
    private AssessmentScheduleRepository $scheduleRepository;

    public function __construct(
        AssessmentRepository $assessmentRepository,
        TokenService $tokenService,
        AssessmentStageRepository $assessmentStageRepository,
        UserRepository $userRepository,
        InstrumentRepository $instrumentRepository,
        AssessmentScheduleRepository $scheduleRepository,
    )
    {
        $this->assessmentRepository = $assessmentRepository;
        $this->tokenService = $tokenService;
        $this->assessmentStageRepository = $assessmentStageRepository;
        $this->userRepository = $userRepository;
        $this->instrumentRepository = $instrumentRepository;
        $this->scheduleRepository = $scheduleRepository;

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
    public function getById(string $id)
    {
        $assessment = $this->assessmentRepository->getById($id);
        if(!$assessment) throw new Exception("Assessment not found");

        $stages = $this->assessmentStageRepository->getAll();
        $stagesData = [];
        $isAllFinished = true;
        foreach($stages as $stage)
        {
            $instruments = $this->instrumentRepository->getAssessmentStageId($stage->id);
            $instrumentData = [];
            foreach ($instruments as $instrument) {
                $scheduled = [];
                $hasSchedule = $this->scheduleRepository->getBySchedule($assessment->id, $stage->id, $instrument->id);
                if ($hasSchedule) {

                    if ($hasSchedule->status !== 'finish') {
                        $isAllFinished = false;
                    }

                    $scheduled['id']    = $hasSchedule->id;
                    $scheduled['status'] = true;
                    $scheduled['started_at'] = $hasSchedule->started_at;
                    $scheduled['finished_at'] =$hasSchedule->finished_at;
                    $scheduled['progress'] = $hasSchedule->status;
                }
                else {
                    $scheduled['status'] = false;
                    $isAllFinished = false;
                }

                $instrumentData[] = [
                    'id' => $instrument->id,
                    'name' => $instrument->name,
                    'type' => $instrument->type,
                    'description'   => $instrument->description,
                    'allowed_extension' => $instrument->allowed_extension,
                    'max_size' => $instrument->max_size,
                    'is_multiple'   => $instrument->is_multiple,
                    'scheduled' => $scheduled
                ];

//                if (!$isAllFinished) {
//                    break;
//                }
            };

            $stagesData[] = [
                'name' => $stage->name,
                'instruments' => $instrumentData,
                'isAllFinished' => $isAllFinished
            ];

        }

        return [
            "stages"        => $stagesData,
            "assessment"    => $assessment
        ];
    }
}
