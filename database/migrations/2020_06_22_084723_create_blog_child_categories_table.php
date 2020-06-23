<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBlogChildCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('blog_child_categories', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255);
            $table->string('slugs', 255);
            $table->bigInteger('parent_cat_id')->unsigned();
            $table->timestamps();
        });
        Schema::table('blog_child_categories', function (Blueprint $table) {
            $table->foreign('parent_cat_id')->references('id')->on('blog_categories')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blog_child_categories');
    }
}
