<?php

namespace App\Services;

use Spatie\Permission\Models\Role;
use Exception;

class RoleServices
{

    public function getAll(): \Illuminate\Database\Eloquent\Collection
    {
        return Role::all("id", "name");
    }

    public function save(string $name): Role
    {
        return Role::create(["name" => $name]);
    }

    public function findByName(string $name): ?Role
    {
       return Role::findByName($name);
    }

    public function getById(string $id): ?Role
    {
        return Role::findById($id);
    }

    /**
     * @throws Exception
     */
    public function delete(string $id): void
    {
        $role = Role::findById($id);

        if(!$role) throw new Exception("Data not found");

        if($role->users()->count() > 0) throw new Exception("Role ".$role->name. " masih di gunakan oleh user");

        $role->delete();

    }

    /**
     * @throws Exception
     */
    public function update(string $name, string $id): Role
    {
        $role = $this->getById($id);

        if (!$role) {
            throw new Exception("Data not found");
        }

        $existingRole = Role::where('name', $name)
            ->where('id', '!=', $id)
            ->first();

        if ($existingRole) {
            throw new Exception("Role ".$name. " sudah ada!");
        }

        $role->name = $name;
        $role->save();

        return $role;
    }
}
