<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('attributes', function (Blueprint $table)
        {
            $table->id();
            $table->string('name')->nullable();
            $table->string('style')->nullable();
            $table->string('slug')->nullable();
            $table->integer('status')->default(1);
            $table->bigInteger('created_by_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('attribute_values', function (Blueprint $table)
        {
            $table->id();
            $table->string('value')->nullable();
            $table->string('hex_color')->nullable();
            $table->string('slug')->nullable();
            $table->bigInteger('attribute_id')->unsigned()->nullable();
            $table->bigInteger('created_by_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade');
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
        Schema::dropIfExists('attributes');
        Schema::dropIfExists('attribute_values');
    }
};
