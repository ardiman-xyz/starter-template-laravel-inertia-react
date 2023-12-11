<?php

namespace App\Services;

use App\DTO\CreateAssessmentDTO;
use App\Entities\AssessmentEntity;
use App\Entities\AssessmentStepEntity;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\AssessmentStepRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use Exception;
use Illuminate\Support\Facades\DB;

class VisitationService
{
    private AcademicSemesterRepository $academicSemesterRepository;
    private SchoolRepository $schoolRepository;
    private TokenService $tokenService;
    private AssessmentRepository $assessmentRepository;
    private UserRepository $userRepository;
    private AssessmentStepRepository $assessmentStepRepository;
    private AssessmentStageRepository $assessmentStageRepository;

    public function __construct(
        AcademicSemesterRepository $academicSemesterRepository,
        SchoolRepository $schoolRepository,
        TokenService $tokenService,
        AssessmentRepository $assessmentRepository,
        UserRepository $userRepository,
        AssessmentStepRepository $assessmentStepRepository,
        AssessmentStageRepository $assessmentStageRepository
    )
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
        $this->schoolRepository = $schoolRepository;
        $this->tokenService = $tokenService;
        $this->assessmentRepository = $assessmentRepository;
        $this->userRepository = $userRepository;
        $this->assessmentStepRepository = $assessmentStepRepository;
        $this->assessmentStageRepository = $assessmentStageRepository;

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

            // store in table assessment_steps
            $stages = $this->assessmentStageRepository->getAll();


            foreach ($stages as $stage) {
                $stepsEntity = new AssessmentStepEntity();
                $stepsEntity->assessmentId = $assessment->id;
                $stepsEntity->assessmentStageId = $stage->id;
                $this->assessmentStepRepository->create($stepsEntity);
            }

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
    public function delete(string $id): void
    {
        $assessment = $this->assessmentRepository->getById($id);
        if(!$assessment) throw new Exception("Assessment not found");

        DB::beginTransaction();

        try {
            $assessmentSteps = $this->assessmentStepRepository->getByAssessmentId($id);

            if($assessmentSteps)
            {
                foreach($assessmentSteps as $assessmentStep) {
                    $assessmentStep->delete();
                }
            }

            $this->assessmentRepository->deleteById($id);
            DB::commit();
        }catch (Exception $exception)
        {
            DB::rollBack();
            throw new $exception;
        }
    }
}
