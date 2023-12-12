<?php

namespace App\Services;

use App\DTO\CreateAssessmentDTO;
use App\DTO\SetUpDateDTO;
use App\Entities\AssessmentEntity;
use App\Entities\AssessmentScheduleEntity;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentScheduleRepository;
use App\Repositories\AssessmentStageRepository;
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
    private AssessmentStageRepository $assessmentStageRepository;
    private InstrumentRepository $instrumentRepository;
    private AssessmentScheduleRepository $scheduleRepository;

    public function __construct(
        AcademicSemesterRepository $academicSemesterRepository,
        SchoolRepository $schoolRepository,
        TokenService $tokenService,
        AssessmentRepository $assessmentRepository,
        UserRepository $userRepository,
        AssessmentStageRepository $assessmentStageRepository,
        InstrumentRepository $instrumentRepository,
        AssessmentScheduleRepository $scheduleRepository
    )
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
        $this->schoolRepository = $schoolRepository;
        $this->tokenService = $tokenService;
        $this->assessmentRepository = $assessmentRepository;
        $this->userRepository = $userRepository;
        $this->assessmentStageRepository = $assessmentStageRepository;
        $this->instrumentRepository = $instrumentRepository;
        $this->scheduleRepository = $scheduleRepository;

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

        return $this->assessmentRepository->findBySchoolAndSemester($school->id, $yearAcademic->id);
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

        DB::beginTransaction();

        try {

            $createEntity = new AssessmentEntity();
            $createEntity->teacherId = $dto->teacherId;
            $createEntity->schoolId = $school->id;
            $createEntity->academicSemesterId = $academic->id;
            $assessment = $this->assessmentRepository->create($createEntity);

            DB::commit();

            return $assessment;

        }catch (Exception $exception)
        {
            DB::rollBack();
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

                    $scheduled['status'] = true;
                    $scheduled['started_at'] = Carbon::parse($hasSchedule->started_at)->translatedFormat('l, d F Y') . ' : ' . Carbon::parse($hasSchedule->started_at)->translatedFormat('H:i');
                    $scheduled['finished_at'] = Carbon::parse($hasSchedule->finished_at)->translatedFormat('l, d F Y') . ' : ' . Carbon::parse($hasSchedule->finished_at)->translatedFormat('H:i');
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

    /**
     * @throws Exception
     */
    public function setting_date(SetUpDateDTO $dto)
    {
        $assessment = $this->assessmentRepository->getById($dto->assessmentId);
        if(!$assessment) throw new Exception("Assessment not found");

        $stage = $this->assessmentStageRepository->getByName($dto->stageName);
        if(!$stage) throw new Exception("Stage not found");

        $instrument = $this->instrumentRepository->getById($dto->instrumentId);
        if(!$instrument) throw new Exception("Instrument not found");

        try {

            $datetimeStart = $dto->dateStart . ' ' . $dto->timeStart;
            $datetimeEnd = $dto->dateEnd . ' ' . $dto->timeEnd;

            $startedAt = DateTime::createFromFormat('Y-m-d H:i', $datetimeStart);
            $endedAt = DateTime::createFromFormat('Y-m-d H:i', $datetimeEnd);


            $entity = new AssessmentScheduleEntity();
            $entity->assessmentId = $dto->assessmentId;
            $entity->assessmentStageId = $stage->id;
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
    public function delete(string $id): void
    {
        $assessment = $this->assessmentRepository->getById($id);
        if(!$assessment) throw new Exception("Assessment not found");

        $this->assessmentRepository->deleteById($id);
    }
}
