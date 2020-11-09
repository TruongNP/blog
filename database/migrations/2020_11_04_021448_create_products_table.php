<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title', 500);
            $table->string('slugs', 500);
            $table->string('description', 4000)->nullable();
            $table->string('feature_image', 500);
            $table->string('tags', 4000)->nullable();
            $table->string('product_type', 500)->nullable();
            $table->string('vendor', 500)->nullable();
            $table->string('collection', 500)->nullable();
            $table->string('media', 2000)->nullable();
            $table->string('variants', 1000)->nullable();
            $table->string('status', 250)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
    }
}
