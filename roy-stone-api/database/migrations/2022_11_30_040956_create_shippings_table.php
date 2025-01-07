<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shippings', function (Blueprint $table) {
            $table->id();
            $table->integer('status')->default(1)->nullable();
            $table->bigInteger('country_id')->unsigned()->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('shipping_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('shipping_id')->unsigned();
            $table->enum('rule_type', ['base_on_price', 'base_on_weight'])->default('base_on_price')->nullable();
            $table->decimal('min', 15)->default(0)->nullable();
            $table->decimal('max', 15)->default(0)->nullable();
            $table->enum('shipping_type', ['free', 'fixed', 'percentage'])->default('free')->nullable();
            $table->decimal('amount', 15)->default(0)->nullable();
            $table->integer('status')->default(1)->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shippings');
    }
};
