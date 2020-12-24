<?php

use Illuminate\Database\Seeder;

class GeneralSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('general_settings')->insert([
            'store_name' => 'Npt Shop',
            'account_email' => 'truongnpt1998@gmail.com',
            'sender_email' => 'truongnpt1998@gmail.com',
            'language' => 'en'
        ]);
    }
}
