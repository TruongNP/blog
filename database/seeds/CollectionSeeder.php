<?php

use Illuminate\Database\Seeder;

class CollectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('collections')->insert([
            'title' => 'All',
            'slug' => 'all',
            'description' => 'All product',
            'feature_image' => 'undefine',
            'status' => 'open'
        ]);
    }
}
