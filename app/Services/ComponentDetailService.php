<?php

namespace App\Services;

use App\DTO\CreateComponentItemDTO;
use App\DTO\UpdateComponentItemDTO;
use App\Entities\ComponentEntity;
use App\Repositories\ComponentDetailRepository;
use App\Repositories\ComponentRepository;
use Exception;

class ComponentDetailService
{
    private ComponentDetailRepository $componentDetailRepository;
    private ComponentRepository $componentRepository;

    public function __construct(ComponentDetailRepository $componentDetailRepository, ComponentRepository $componentRepository)
    {
        $this->componentDetailRepository = $componentDetailRepository;
        $this->componentRepository = $componentRepository;
    }

    /**
     * @throws Exception
     */
    public function create(CreateComponentItemDTO $dto)
    {

        $component = $this->componentRepository->findById($dto->documentId);

        if(!$component) throw new Exception("Instrument not found");

        try {

            $entity = new ComponentEntity();
            $entity->documentId = (int)$dto->documentId;
            $entity->name = $dto->name;
            $entity->maxScore = $dto->maxScore;

            return $this->componentDetailRepository->create($entity);

        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function update(UpdateComponentItemDTO $dto): \App\Models\ComponentDetail
    {
        $componentItem = $this->componentDetailRepository->findById($dto->id);
        if(!$componentItem) throw new Exception("Item not found");

        $componentItem->name = $dto->name;
        $componentItem->max_score = (int)$dto->maxScore;

        return $this->componentDetailRepository->update($componentItem->id, $componentItem);
    }

    /**
     * @throws Exception
     */
    public function deleteById(string $id)
    {
        $item = $this->componentDetailRepository->findById($id);
        if(!$item) throw new Exception("Item not found");

        return $this->componentDetailRepository->delete($id);
    }
}
