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
            'first_name' => 'Truong',
            'last_name' => 'Npt',
            'phone_number' => '0399812700',
            'website' => '',
            'email' => 'truongnpt1998@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'administrator'
        ]);
        DB::table('users')->insert([
            'first_name' => 'Master',
            'last_name' => 'Admin',
            'website' => '',
            'phone_number' => '0399812700',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'administrator'
        ]);
    }
}
