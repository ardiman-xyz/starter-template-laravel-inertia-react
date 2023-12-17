<?php

namespace App\Services;

use App\Repositories\ComponentRepository;
use Exception;

class ComponentService
{
    private ComponentRepository $componentRepository;

    public function __construct(ComponentRepository $componentRepository)
    {
        $this->componentRepository = $componentRepository;
    }

    public function getAll()
    {
        return $this->componentRepository->findall();
    }

    public function create(string $name)
    {
        try {
            return $this->componentRepository->create($name);

        }catch (Exception $exception)
        {
            throw new $exception;
        }
    }

    /**
     * @throws Exception
     */
    public function getById(string $id)
    {
        $component = $this->componentRepository->findById($id);
        if(!$component) throw new Exception("Instrument not found");

        return $component;
    }

}
