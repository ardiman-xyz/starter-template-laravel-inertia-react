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

    public function getByAssessmentStageId(string $stageId)
    {
        $data = $this->instrumentRepository->getAssessmentStageId($stageId);
        return $data->map(function ($item) {
            $item->allowed_extension = $item->allowed_extension !== null ? explode(", ", $item->allowed_extension) : [];
            return $item;
        });
    }

    /**
     * @throws Exception
     */
    public function create(CreateInstrumentDTO $data)
    {
        $stage = $this->assessmentStageRepository->getById($data->assessmentStageId);
        if(!$stage) throw new Exception("Stage not found");

        $allowed_extensions_string = implode(", ", $data->allowedExtensions);

        try {

            $entity = new InstrumentEntity();
            $entity->assessmentStageId = $data->assessmentStageId;
            $entity->name = $data->name;
            $entity->type = $data->type;
            $entity->description = $data->description;
            $entity->allowedExtensions = $allowed_extensions_string;
            $entity->maxSize = $data->maxSize;
            $entity->isMultiple = $data->maxSize === "yes" ? 1 : 0;

            return $this->instrumentRepository->create($entity);

        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function update(CreateInstrumentDTO $data, string $id): \App\Models\Instrument
    {
        $instrument = $this->instrumentRepository->getById($id);

        if(!$instrument) throw new Exception("Instrument not found");

        $allowed_extensions_string = implode(", ", $data->allowedExtensions);

        $instrument->name = $data->name;
        $instrument->type = $data->type;
        $instrument->description = $data->description;
        $instrument->allowed_extension = $allowed_extensions_string;
        $instrument->max_size = $data->maxSize;
        $instrument->is_multiple = $data->maxSize === "yes" ? 1 : 0;

        return $this->instrumentRepository->update($instrument->id, $instrument);
    }

    /**
     * @throws Exception
     */
    public function delete(string $id): void
    {
        $instrument = $this->instrumentRepository->getById($id);
        if(!$instrument) throw new Exception("Instrument not found");

        $this->instrumentRepository->delete($id);
    }
}
