<?php

use Illuminate\Database\Seeder;
use App\Models\Blog;
use App\Models\BlogCategories;
use App\Models\BlogSubCategories;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call([
            // BlogSeeder::class,
            // BlogCategoriesSeeder::class,
            // BlogSubCategoriesSeeder::class,
        // ]);

        $this->call([
            factory(Blog::class, 20)->create(),
            factory(BlogCategories::class, 5)->create(),
            factory(BlogSubCategories::class, 10)->create(),
        ]);
    }
}

