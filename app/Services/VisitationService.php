<?php

namespace App\Services;

use App\DTO\CreateAssessmentDTO;
use App\Entities\AssessmentEntity;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\AssessmentRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use Exception;

class VisitationService
{
    private AcademicSemesterRepository $academicSemesterRepository;
    private SchoolRepository $schoolRepository;
    private TokenService $tokenService;
    private AssessmentRepository $assessmentRepository;
    private UserRepository $userRepository;

    public function __construct(
        AcademicSemesterRepository $academicSemesterRepository,
        SchoolRepository $schoolRepository,
        TokenService $tokenService,
        AssessmentRepository $assessmentRepository,
        UserRepository $userRepository
    )
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
        $this->schoolRepository = $schoolRepository;
        $this->tokenService = $tokenService;
        $this->assessmentRepository = $assessmentRepository;
        $this->userRepository = $userRepository;

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

        try {

            $createEntity = new AssessmentEntity();
            $createEntity->teacherId = $dto->teacherId;
            $createEntity->schoolId = $school->id;
            $createEntity->academicSemesterId = $academic->id;

            return $this->assessmentRepository->create($createEntity);

        }catch (Exception $exception)
        {
            throw new Exception("something wrong!");
        }
    }

    /**
     * @throws Exception
     */
    public function delete(string $id): void
    {
        $assessment = $this->assessmentRepository->getById($id);
        if(!$assessment) throw new Exception("Assessment not found");

        try {
            $this->assessmentRepository->deleteById($id);
        }catch (Exception $exception)
        {
            throw new Exception("Something wrong, try again");
        }
    }
}
