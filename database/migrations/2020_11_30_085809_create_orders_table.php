<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('first_name', 255);
            $table->string('last_name', 255);
            $table->string('phone_number', 20);
            $table->string('contact_email', 255);
            $table->string('shipping_address', 255);
            $table->string('city', 255)->nullable();
            $table->string('country', 255)->nullable();
            $table->string('note', 255)->nullable();
            $table->string('payment_method', 255);
            $table->json('order_items');
            $table->integer('total')->nullable();
            $table->string('status', 255)->nullable();
            $table->string('payment_status', 255)->nullable();
            $table->string('fulfillment_status', 255)->nullable();
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
        Schema::dropIfExists('orders');
    }
}
