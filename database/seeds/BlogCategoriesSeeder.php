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
            ["title"=>"Uncategorized", "slugs"=>"uncategorized", "created_at"=>"2020-06-10 06:40:29", "updated_at"=>"2020-06-10 06:40:29"],
        ]);
    }
}
