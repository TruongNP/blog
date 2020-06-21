<?php

use Illuminate\Database\Seeder;

class BlogCategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('blog_categories')->insert([
            ["title"=>"Category 1", "slugs"=>"categoy-1", "created_at"=>"2020-06-10 06:40:29", "updated_at"=>"2020-06-10 06:40:29"],
            ["title"=>"Category 2", "slugs"=>"categoy-2", "created_at"=>"2020-06-10 06:40:29", "updated_at"=>"2020-06-10 06:40:29"],
            ["title"=>"Category 3", "slugs"=>"categoy-3", "created_at"=>"2020-06-10 06:40:29", "updated_at"=>"2020-06-10 06:40:29"],
            ["title"=>"Category 4", "slugs"=>"categoy-4", "created_at"=>"2020-06-10 06:40:29", "updated_at"=>"2020-06-10 06:40:29"],
        ]);
    }
}
