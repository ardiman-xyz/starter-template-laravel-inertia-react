<?php

namespace App\Services;

use App\Models\Component;
use App\Models\Instrument;
use App\Models\User;
use App\Repositories\ComponentRepository;
use Database\Seeders\ComponentSeeder;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;

class ComponentService
{
    private ComponentRepository $componentRepository;
    private TokenService $tokenService;
    
    public function __construct(ComponentRepository $componentRepository)
    {
        $this->componentRepository = $componentRepository;
        $this->tokenService = new TokenService();
    }

    public function getAll()
    {

        $currentUser = $this->tokenService->currentUser();

        if(!$currentUser)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }

        $user = User::find($currentUser->id);

        if(!$user)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }



        return $this->componentRepository->findAllBySchoolId($user->school->id);
    }

    public function create(string $name)
    {

        $currentUser = $this->tokenService->currentUser();

        if(!$currentUser)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }

        $user = User::find($currentUser->id);

        if(!$user)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }


            return $this->componentRepository->create($name, $user->school->id);

       
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

    public function update(string $name, string $id): void
    {
        $instrument = Component::find($id);

        if(!$instrument) throw new Exception("Data tidak ditemukan!");

        $instrument->name = $name;
        $instrument->save();
    }


    public function runMigration()
    {
        $currentUser = $this->tokenService->currentUser();

        if(!$currentUser)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }

        $user = User::find($currentUser->id);

        if(!$user)
        {
            Cookie::forget('vistoken');

            return redirect()->route('auth.login');
        }


        $existingComponents = Component::where('school_id', $user->school->id)->count();
            
        if ($existingComponents > 0) throw new Exception("Tidak dapat menjalankan migration, data sudah ada!");

        try {
            DB::beginTransaction();

            $seeder = new ComponentSeeder();
            $seeder->run();

            DB::commit();

        } catch (\Exception $e) {
            DB::rollBack();
            
            return $e;
        }
    }

}
