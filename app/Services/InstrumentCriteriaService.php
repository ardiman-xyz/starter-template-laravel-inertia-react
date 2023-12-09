<?php

namespace App\Services;

use App\DTO\CreateInstrumentCriteriaDTO;
use App\DTO\UpdateInstrumentItemDTO;
use App\Entities\InstrumentCriteriaEntity;
use App\Http\Requests\UpdateInstrumenItem;
use App\Repositories\InstrumentCriteriaRepository;
use App\Repositories\InstrumentRepository;
use Exception;

class InstrumentCriteriaService
{
    private InstrumentCriteriaRepository $criteriaRepository;
    private InstrumentRepository $instrumentRepository;

    public function __construct(InstrumentCriteriaRepository $criteriaRepository, InstrumentRepository $instrumentRepository)
    {
        $this->criteriaRepository = $criteriaRepository;
        $this->instrumentRepository = $instrumentRepository;
    }

    /**
     * @throws Exception
     */
    public function getAll(string $instrumentId)
    {
        $instrument = $this->instrumentRepository->getById($instrumentId);
        if(!$instrument) throw new Exception("Instrument not found");

        return $this->criteriaRepository->getByInstrumentId($instrumentId);
    }

    /**
     * @throws Exception
     */
    public function create(CreateInstrumentCriteriaDTO $criteriaDTO)
    {
        $instrument = $this->instrumentRepository->getById($criteriaDTO->instrumentId);
        if(!$instrument) throw new Exception("Instrument not found");

        try {

            $instrumentEntity = new InstrumentCriteriaEntity();
            $instrumentEntity->instrumentId = $criteriaDTO->instrumentId;
            $instrumentEntity->title = $criteriaDTO->title;
            $instrumentEntity->maxScore = (int)$criteriaDTO->maxScore;

            return $this->criteriaRepository->create($instrumentEntity);

        }catch (Exception $exception)
        {
            throw new Exception("something wrong");
        }
    }

    /**
     * @throws Exception
     */
    public function update(UpdateInstrumentItemDTO $data)
    {
        $criteria = $this->criteriaRepository->getById($data->id);
        if(!$criteria) throw new Exception("Instrument item not found");

        $criteria->title = $data->title;
        $criteria->max_score = (int) $data->maxScore;

        return $this->criteriaRepository->update($data->id, $criteria);

    }

    /**
     * @throws Exception
     */
    public function delete(string $id): void
    {
        $criteria = $this->criteriaRepository->getById($id);
        if(!$criteria) throw new Exception("Instrument item not found");

        $this->criteriaRepository->deleteById($id);
    }
}
