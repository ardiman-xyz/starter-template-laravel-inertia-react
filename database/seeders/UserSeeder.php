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
        $role = Role::firstOrCreate(['name' => 'Admin']);

        $user = new User();
        $user->name = 'Ardiman';
        $user->email = 'ardiman@umkendari.ac.id';
        $user->password = Hash::make('Ardiman123_');

        $user->save();
        $user->roles()->attach($role);
    }
}
