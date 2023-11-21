<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role = Role::firstOrCreate(['name' => 'Finance']);

        $user = new User();
        $user->name = 'Rey Nilda, S.Pd';
        $user->email = 'rey.nilda@umkendari.ac.id';
        $user->password = Hash::make('reynilda123');
        
        $user->save();
        $user->roles()->attach($role);
    }
}
