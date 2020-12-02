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
            'avata' => '/uploads/asset/npt.jpg',
            'first_name' => 'Truong',
            'last_name' => 'Npt',
            'filter_name' => 'Truong Npt',
            'phone_number' => '0399812700',
            'address' => '186 dang van ngu, P.14, O.Phu Nhuan, TP. HCM',
            'city' => 'Ho Chi minh',
            'country' => 'Viet Nam',
            'website' => '',
            'email' => 'truongnpt1998@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'administrator'
        ]);
        DB::table('users')->insert([
            'avata' => '/uploads/asset/npt.jpg',
            'first_name' => 'Master',
            'last_name' => 'Admin',
            'filter_name' => 'Master Admin',
            'address' => '186 dang van ngu, P.14, O.Phu Nhuan, TP. HCM',
            'city' => 'Ho Chi minh',
            'country' => 'Viet Nam',
            'website' => '',
            'phone_number' => '0399812700',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin'),
            'role' => 'administrator'
        ]);
    }
}
