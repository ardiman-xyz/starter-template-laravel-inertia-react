<?php

namespace App\Services;

use Spatie\Permission\Models\Role;
use Exception;

class RoleServices
{
    /**
     * @throws Exception
     */
    public function save(string $name): Role
    {
//        $row = $this->findByName($name);
//
//        if($row) throw new Exception("Role already exist");

        return Role::create(["name" => $name]);
    }

    public function findByName(string $name): ?Role
    {
       return Role::findByName($name);
    }
}
