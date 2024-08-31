<?php

namespace App\Services;

use App\DTO\AcademicCreateDTO;
use App\DTO\AcademicSemesterDTO;
use App\Entities\AcademicSemester;
use App\Repositories\AcademicSemesterRepository;
use App\Repositories\SchoolRepository;
use Exception;
use Illuminate\Support\Facades\Log;

class AcademicSemesterService
{
    private AcademicSemesterRepository $academicSemesterRepository;
    private SchoolRepository $schoolRepository;

    public function __construct(AcademicSemesterRepository $academicSemesterRepository, SchoolRepository $schoolRepository)
    {
        $this->academicSemesterRepository = $academicSemesterRepository;
        $this->schoolRepository = $schoolRepository;
    }

    public function getaAll()
    {
        return $this->academicSemesterRepository->findAll();
    }

    public function all(string $schoolId)
    {
        return $this->academicSemesterRepository->getBySchoolId($schoolId);
    }

    public function create(AcademicSemesterDTO $data)
    {

        $isSchoolExist = $this->schoolRepository->getById($data->schoolId);

        if(!$isSchoolExist) throw new Exception("Sekolah tidak ditemukan");

        $createDto = new AcademicCreateDTO();
        $createDto->schoolId = $data->schoolId;
        $createDto->year = $data->year;
        $createDto->semester = $data->semester;
        $createDto->academicYear = $data->academicYear;

        $isAcademicSemesterAlreadyExist = $this->academicSemesterRepository->academicAlreadyExists($createDto);


        if ($isAcademicSemesterAlreadyExist) throw new Exception("Tahun akademik dan semester sudah ada di tahun $data->year");

        if (!in_array($data->semester, ['ganjil', 'genap'])) {
            throw new Exception("Semester harus 'ganjil' atau 'genap'");
        }

        try {

            $dataStore = new AcademicSemester();
            $dataStore->schoolId = $data->schoolId;
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

    public function update(AcademicSemesterDTO $data, string $id)
    {

        $createDto = new AcademicCreateDTO();
        $createDto->schoolId = $data->schoolId;
        $createDto->year = $data->year;
        $createDto->semester = $data->semester;
        $createDto->academicYear = $data->academicYear;


        $isAcademicSemesterAlreadyExist = $this->academicSemesterRepository->academicAlreadyExistsExcept($createDto, $id);
        if ($isAcademicSemesterAlreadyExist) {
            throw new Exception("Tahun akademik dan semester sudah ada di tahun $data->year");
        }

        if (!in_array($data->semester, ['ganjil', 'genap'])) {
            throw new Exception("Semester harus 'ganjil' atau 'genap'");
        }

        $academicSemester = $this->academicSemesterRepository->getById($id);
        if (!$academicSemester) {
            throw new Exception("Data tidak ditemukan");
        }

        try {

            $academicSemester->year = $data->year;
            $academicSemester->semester = $data->semester;
            $academicSemester->academic_year = $data->academicYear;
            $academicSemester->start_date = $data->startDate;
            $academicSemester->end_date = $data->endDate;
            $academicSemester->save();

            return $academicSemester;

        }catch (Exception $exception){

            throw new $exception;
        }

    }

    public function deleteById(string $id): void
    {
        $data = $this->academicSemesterRepository->getById((int)$id);
        if(!$data) throw new Exception("Data tidak ditemukan");

        try {
            $data->delete();
        } catch (Exception $exception) {
            throw new Exception("Gagal menghapus data: " . $exception->getMessage());
        }
    }

}
