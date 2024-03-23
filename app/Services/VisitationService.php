<?php

namespace App\Services;

use App\DTO\AnalysisUpdateDTO;
use App\DTO\CreateAssessmentDTO;
use App\DTO\ScoredAssessmentDTO;
use App\DTO\SetUpDateDTO;
use App\Entities\AssessmentEntity;
use App\Entities\AssessmentScheduleEntity;
use App\Entities\ScoredEntity;
use App\Models\AssessmentScore;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\AssessmentAnswerRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScheduleRepository;
use App\Repositories\AssessmentScoreRepository;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\ComponentDetailRepository;
use App\Repositories\ComponentRepository;
use App\Repositories\InstrumentCriteriaRepository;
use App\Repositories\InstrumentRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;
use DateTime;

class VisitationService
{
    private AcademicSemesterRepository $academicSemesterRepository;
    private SchoolRepository $schoolRepository;
    private TokenService $tokenService;
    private AssessmentRepository $assessmentRepository;
    private UserRepository $userRepository;
    private InstrumentRepository $instrumentRepository;
    private AssessmentScheduleRepository $scheduleRepository;
    private InstrumentCriteriaRepository $criteriaRepository;
    private ComponentRepository $componentRepository;
    private ComponentDetailRepository $componentDetailRepository;
    private AssessmentAnswerRepository $assessmentAnswerRepository;
    private AssessmentScoreRepository $assessmentScoreRepository;

    public function __construct(
        AcademicSemesterRepository $academicSemesterRepository,
        SchoolRepository $schoolRepository,
        TokenService $tokenService,
        AssessmentRepository $assessmentRepository,
        UserRepository $userRepository,
        InstrumentRepository $instrumentRepository,
        AssessmentScheduleRepository $scheduleRepository,
        InstrumentCriteriaRepository $criteriaRepository,
        ComponentRepository $componentRepository,
        ComponentDetailRepository $componentDetailRepository,
        AssessmentAnswerRepository $assessmentAnswerRepository,
        AssessmentScoreRepository $assessmentScoreRepository
    )
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
        $this->schoolRepository = $schoolRepository;
        $this->tokenService = $tokenService;
        $this->assessmentRepository = $assessmentRepository;
        $this->userRepository = $userRepository;
        $this->instrumentRepository = $instrumentRepository;
        $this->scheduleRepository = $scheduleRepository;
        $this->criteriaRepository = $criteriaRepository;
        $this->componentRepository = $componentRepository;
        $this->componentDetailRepository = $componentDetailRepository;
        $this->assessmentAnswerRepository = $assessmentAnswerRepository;
        $this->assessmentScoreRepository = $assessmentScoreRepository;
    }

    public function getAcademicSemester()
    {
        return $this->academicSemesterRepository->findAll();
    }

    /**
     * @throws Exception
     */
    public function getFilterByAcademicSemester(string $year, string $semester)
    {
        $yearAcademic = $this->academicSemesterRepository->getByYearSemester($year, $semester);
        if(!$yearAcademic) throw new Exception("Year and semester not found");

        $school = $this->schoolRepository->getByUserId($this->tokenService->userId());


        $assessments = $this->assessmentRepository->findBySchoolAndSemester($school->id, $yearAcademic->id);

        $assessments->map(function ($assessment) {
            $sumMaxScore = (int)$this->componentDetailRepository->sumMaxScore();
            $totalScore = (int)$this->assessmentScoreRepository->totalScore($assessment->id);

            $assessment->final_score = $this->calculateFinalScore($totalScore, $sumMaxScore);

            return $assessment;
        });

        return $assessments;
    }

    public function getTeachersBySchoolId()
    {
        $school = $this->schoolRepository->getByUserId($this->tokenService->userId());

        return $this->userRepository->getTeacherBySchoolId($school->id);

    }

    /**
     * @throws Exception
     */
    public function create(CreateAssessmentDTO $dto)
    {
        $teacher = $this->userRepository->getById($dto->teacherId);
        if(!$teacher) throw new Exception("Teacher not found");

        $academic = $this->academicSemesterRepository->getByYearSemester($dto->academicYear, $dto->academicSemester);
        if(!$academic) throw new Exception("Year and semester not found");

        $school = $this->schoolRepository->getByUserId($this->tokenService->userId());
        if(!$school) throw new Exception("School not found");

        try {

            $startDateTime = Carbon::parse($dto->dateStart . ' ' . $dto->timeStart);
            $endDateTime = Carbon::parse($dto->dateEnd . ' ' . $dto->timeEnd);

            $createEntity = new AssessmentEntity();
            $createEntity->teacherId = $dto->teacherId;
            $createEntity->schoolId = $school->id;
            $createEntity->academicSemesterId = $academic->id;
            $createEntity->startedAt = $startDateTime->toDateTimeString();
            $createEntity->finishedAt = $endDateTime->toDateTimeString();

            return $this->assessmentRepository->create($createEntity);

        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function getById(string $id): array
    {
        $assessment = $this->assessmentRepository->getById($id);
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
                        'status'    => (bool)$answer,
                        'score'     => $answer ? $answer->score : null,
                    ],
                ];
            }

            $result[] = [
                'id' => $component->id,
                'name' => $component->name,
                'details' => $componentItems,

            ];
        }

        $sumMaxScore = (int)$this->componentDetailRepository->sumMaxScore();
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
        if ($max_score == 0) {
            // Handle the case where $max_score is zero
            // You can either return a default value or throw an exception
            return [
                "final_score" => 0,
                "evaluate" => "N/A",
            ];
        }
    
        
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
    public function setting_date(SetUpDateDTO $dto)
    {
        $assessment = $this->assessmentRepository->getById($dto->assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");


        try {

            $datetimeStart = $dto->dateStart . ' ' . $dto->timeStart;
            $datetimeEnd = $dto->dateEnd . ' ' . $dto->timeEnd;

            $startedAt = DateTime::createFromFormat('Y-m-d H:i', $datetimeStart);
            $endedAt = DateTime::createFromFormat('Y-m-d H:i', $datetimeEnd);


            $entity = new AssessmentEntity();
            $entity->assessmentId = $dto->assessmentId;
            $entity->instrumentId = $dto->instrumentId;
            $entity->status = "schedule";
            $entity->startedAt = $startedAt;
            $entity->finishedAt = $endedAt;

            return $this->scheduleRepository->create($entity);

        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function update_date(SetUpDateDTO $dto)
    {
        $assessment = $this->assessmentRepository->getById($dto->assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");

        $datetimeStart = $dto->dateStart . ' ' . $dto->timeStart;
        $datetimeEnd = $dto->dateEnd . ' ' . $dto->timeEnd;

        $startedAt = DateTime::createFromFormat('Y-m-d H:i', $datetimeStart);
        $endedAt = DateTime::createFromFormat('Y-m-d H:i', $datetimeEnd);

        $assessment->id  = $dto->assessmentId;
        $assessment->started_at     = $startedAt;
        $assessment->finished_at    = $endedAt;

        return $this->assessmentRepository->update($assessment->id, $assessment);

    }

    /**
     * @throws Exception
     */
    public function reset_schedule(string $id)
    {
        $schedule = $this->scheduleRepository->getById($id);
        if(!$schedule) throw new Exception("Schedule not found");

        return $this->scheduleRepository->deleteById($id);

    }

    /**
     * @throws Exception
     */
    public function instrument_criteria(string $assessment_id, string $instrument_id)
    {
        $assessment = $this->assessmentRepository->getById($assessment_id);
        if(!$assessment) throw new Exception("Assessment not found");

        $instrument = $this->instrumentRepository->getById($instrument_id);
        if(!$instrument) throw new Exception("InstrumentController not found");

        return $this->criteriaRepository->getByInstrumentId($instrument_id);
    }

    /**
     * @throws Exception
     */
    public function scored(ScoredAssessmentDTO $dto)
    {
        $assessment = $this->assessmentRepository->getById($dto->assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");

        $component = $this->componentRepository->findById($dto->componentId);
        if(!$component) throw new Exception("Component not found");

        $componentDetail = $this->componentDetailRepository->findById($dto->componentDetailId);
        if(!$componentDetail) throw new Exception("Component detail not found");

        $scoredEntity = new ScoredEntity();
        $scoredEntity->assessmentId = $dto->assessmentId;
        $scoredEntity->componentId = (int)$dto->componentId;
        $scoredEntity->componentDetailId = (int)$dto->componentDetailId;
        $scoredEntity->score = (int)$dto->value;

        $alreadyScored = $this->scoredStatus($dto);

        if (!$alreadyScored) {
            return $this->saveScored($scoredEntity);
        }else{
            return $this->updateScored($dto, $alreadyScored);
        }

    }

    public function saveScored(ScoredEntity $entity)
    {
        return $this->assessmentScoreRepository->create($entity);
    }

    public function scoredStatus(ScoredAssessmentDTO $dto)
    {
        return $this->assessmentScoreRepository->findByAssessmentAndItemId($dto->assessmentId, $dto->componentId, $dto->componentDetailId);
    }

    public function updateScored(ScoredAssessmentDTO $dto, AssessmentScore $assessmentScore): AssessmentScore
    {
       $assessmentScore->score = (int)$dto->value;
       return $this->assessmentScoreRepository->update($assessmentScore->id, $assessmentScore);
    }

    /**
     * @throws Exception
     */
    public function delete(string $id): void
    {
        $assessment = $this->assessmentRepository->getById($id);
        if(!$assessment) throw new Exception("Assessment not found");

        $this->assessmentRepository->deleteById($id);
    }

    /**
     * @throws Exception
     */
    public function UpdateAnalysis(AnalysisUpdateDTO $dto): \App\Models\Assessment
    {
        $assessment = $this->assessmentRepository->findById($dto->assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");

        $assessment->findings = $dto->finder;
        $assessment->action_plan = $dto->actionPlan;
        return $this->assessmentRepository->update($assessment->id, $assessment);
    }

    public function finish(string $assessment_id)
    {
        $assessment = $this->assessmentRepository->findById($assessment_id);
        if(!$assessment) throw new Exception("Assessment not found");

        $assessment->status = "finish";
        return $this->assessmentRepository->update($assessment->id, $assessment);
    }
}
