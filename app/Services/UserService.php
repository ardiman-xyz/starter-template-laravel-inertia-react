<?php

namespace App\Services;

use App\DTO\UserDTO;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Exception;

class UserService
{

    public function getAllWithRole()
    {
        $users = User::all();

        return $users->map(function ($user) {

            $role = $user->roles->pluck('name')->first();

            return [
                "id"    => $user->id,
                "name"  => $user->name,
                "email" => $user->email,
                "role" => $role
            ];
        });
   }

    public function getUsersByRole($role): \Illuminate\Database\Eloquent\Collection|array
    {
        return User::with('roles')->whereHas('roles', function ($query) use ($role) {
            $query->where('name', $role);
        })->get();
    }

    /**
     * @throws Exception
     */
    public function save(UserDTO $DTO): User
    {
        DB::beginTransaction();

        try {

            $user = User::create([
                "name"      => $DTO->getName(),
                "email"     => $DTO->getEmail(),
                "password"  => $DTO->getPassword()
            ]);

            if($DTO->getRole() !== null )
            {
                $user->assignRole($DTO->getRole());
            }

            DB::commit();

            return $user;


        }catch (Exception $exception)
        {
            DB::rollBack();
            throw $exception;
        }
    }

    public function getById(string $id): ?User
    {
        return User::find($id);
    }

    public function delete(string $id): void
    {
        $user = $this->getById($id);

        if(!$user) throw new Exception("Data not found");

        $user->delete();
    }
}
