<?php

use Illuminate\Database\Seeder;

class SubscribeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('subscribes')->insert([
            'email' => 'truongnpt1998@gmail.com',
            'name' => 'Truong Npt'
        ]);
    }
}
