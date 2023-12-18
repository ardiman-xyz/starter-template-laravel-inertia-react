<?php

namespace App\Repositories;

use App\Models\Component as Model;

class ComponentRepository
{

    public function findall()
    {
        return Model::all();
    }

    public function create(string $name, string $description = null)
    {
        return Model::create([
           "name"           => $name ,
            "description"   => $description
        ]);
    }

    public function findById(string $id)
    {
        return Model::with('details')->find($id);
    }

    public function delete(string $id)
    {
        return Model::where("id", $id)->delete();
    }

}
