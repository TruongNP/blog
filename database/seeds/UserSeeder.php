<?php

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Truong Npt',
            'email' => 'truongnpt1998@gmail.com',
            'password' => Hash::make('admin'),
        ]);
        DB::table('users')->insert([
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
        ]);
    }
}
