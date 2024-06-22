<?php

namespace App\Services;

use App\DTO\AcademicSemesterDTO;
use App\Entities\AcademicSemester;
use App\Repositories\AcademicSemesterRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class AcademicSemesterService
{
    private AcademicSemesterRepository $academicSemesterRepository;

    public function __construct(AcademicSemesterRepository $academicSemesterRepository)
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
    }

    public function getaAll()
    {
        return $this->academicSemesterRepository->findAll();
    }

    public function all()
    {
        return $this->academicSemesterRepository->getAll();
    }

    public function create(AcademicSemesterDTO $data)
    {
        $isAcademicSemesterAlreadyExist = $this->academicSemesterRepository->academicAlreadyExists($data->year, $data->semester, $data->academicYear);
        if ($isAcademicSemesterAlreadyExist) throw new Exception("Tahun akademik dan semester sudah ada di tahun $data->year");

        if (!in_array($data->semester, ['ganjil', 'genap'])) {
            throw new Exception("Semester harus 'ganjil' atau 'genap'");
        }

        try {

            $dataStore = new AcademicSemester();
            $dataStore->year = $data->year;
            $dataStore->semester = $data->semester;
            $dataStore->academicYear = $data->academicYear;
            $dataStore->startDate = $data->startDate;
            $dataStore->endDate = $data->endDate;

            return $this->academicSemesterRepository->save($dataStore);

        }catch (Exception $exception){

            Log::error('Error creating academic semester: ' . $exception->getMessage(), [
                'year' => $data->year,
                'semester' => $data->semester,
                'academicYear' => $data->academicYear,
                'startDate' => $data->startDate,
                'endDate' => $data->endDate,
            ]);

            throw new Exception($exception->getMessage());
        }

    }

}
