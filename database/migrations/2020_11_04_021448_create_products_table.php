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
            $table->string('description', 3000)->nullable();
            $table->string('feature_image', 255)->nullable();
            $table->string('tags', 2000)->nullable();
            $table->string('product_type', 500)->nullable();
            $table->string('vendor', 255)->nullable();
            $table->string('collection', 500)->nullable();
            $table->string('media', 2000)->nullable();
            $table->integer('price')->nullable();
            $table->integer('compare_price')->nullable();
            $table->string('product_code', 255)->nullable();
            $table->integer('quantity')->nullable();
            $table->json('variants')->nullable();
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
