<?php

namespace App\Services;

use App\DTO\CreateInstrumentDTO;
use App\DTO\UpdateInstrumentDTO;
use App\Entities\InstrumentEntity;
use App\Repositories\AssessmentStageRepository;
use App\Repositories\InstrumentRepository;
use Exception;

class InstrumentService
{
    private InstrumentRepository $instrumentRepository;
    private AssessmentStageRepository $assessmentStageRepository;

    public function __construct(InstrumentRepository $instrumentRepository, AssessmentStageRepository $assessmentStageRepository)
    {
        $this->instrumentRepository = $instrumentRepository;
        $this->assessmentStageRepository = $assessmentStageRepository;
    }

    public function getAll()
    {
        return $this->instrumentRepository->getAll();
    }

    /**
     * @throws Exception
     */
    public function create(string $name, string $type, string $stageId)
    {
        $stage = $this->assessmentStageRepository->getById($stageId);
        if(!$stage) throw new Exception("Stage not found");

        try {

            $entity = new InstrumentEntity();
            $entity->assessmentStageId = $stageId;
            $entity->name = $name;
            $entity->type = $type;

            return $this->instrumentRepository->create($entity);

        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function update(UpdateInstrumentDTO $data): \App\Models\Instrument
    {
        $stage = $this->assessmentStageRepository->getById($data->stageId);
        if(!$stage) throw new Exception("Stage not found");

        $instrument = $this->instrumentRepository->getById($data->id);

        if(!$instrument) throw new Exception("Instrument not found");

        $instrument->name = $data->name;
        $instrument->type = $data->type;

        return $this->instrumentRepository->update($instrument->id, $instrument);
    }
}
