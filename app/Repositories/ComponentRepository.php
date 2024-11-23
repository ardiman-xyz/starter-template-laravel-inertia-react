<?php

namespace App\Repositories;

use App\Models\Component as Model;

class ComponentRepository
{

    public function findall()
    {
        return Model::all();
    }

    public function findAllBySchoolId(string $id)
    {
        return Model::where("school_id", $id)->with("details")->get();
    }

    public function create(string $name, string $schoolId)
    {
        return Model::create([
            "school_id" => $schoolId,
            "name"           => $name ,
            "description"   => null
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
