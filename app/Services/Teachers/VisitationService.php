<?php

namespace App\Services\Teachers;

use App\Repositories\AssessmentRepository;
use App\Repositories\SchoolRepository;
use App\Repositories\UserRepository;
use App\Repositories\VisitationRepository;
use App\Services\TokenService;
use Exception;

class VisitationService
{
    private $userId;

    private AssessmentRepository $assessmentRepository;
    private SchoolRepository $schoolRepository;
    private TokenService $tokenService;
    private UserRepository $userRepository;

    public function __construct(
        AssessmentRepository $assessmentRepository,
        SchoolRepository $schoolRepository,
        TokenService $tokenService,
        UserRepository $userRepository,
    )
    {
        $this->assessmentRepository = $assessmentRepository;
        $this->schoolRepository = $schoolRepository;
        $this->tokenService = $tokenService;
        $this->userRepository = $userRepository;

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

//        return $this->assessmentRepository->getById()
    }
}
