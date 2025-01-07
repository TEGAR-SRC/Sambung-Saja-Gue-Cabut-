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
        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->bigInteger('user_id')->unsigned()->nullable();
            $table->string('street')->nullable();
            $table->string('city')->nullable();
            $table->string('pincode')->nullable();
            $table->integer('is_default')->default(0);
            $table->string('country_code')->nullable();
            $table->String('phone')->default(0)->nullable();
            $table->bigInteger('country_id')->unsigned()->nullable();
            $table->bigInteger('state_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->nullable();
            $table->foreign('state_id')->references('id')->on('states')->onDelete('cascade')->nullable();
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('user_addresses');
    }
};
