<?php

namespace App\Http\Controllers;

use App\Repositories\AcademicSemesterRepository;
use App\Services\VisitationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Exception;

class VisitationController extends Controller
{
    private VisitationService $visitationService;

    public function __construct()
    {
        $academicRepository = new AcademicSemesterRepository();
        $this->visitationService = new VisitationService($academicRepository);
    }

    public function index(): \Inertia\Response
    {
        $data = $this->visitationService->getAcademicSemester();
        return Inertia::render("Visitation/Index", [
            "academic_year" => $data
        ]);
    }

    public function filter(Request $request)
    {
        $year = $request->query('year');
        $semester = $request->query('smt');

        if(!$year || !$semester) {
            abort("404");
        }

        try {

            $data = $this->visitationService->getFilterByAcademicSemester($year, $semester);

            return Inertia::render("Visitation/Filter");

        }catch (Exception $exception)
        {
            return "not okay";
        }


    }
}
