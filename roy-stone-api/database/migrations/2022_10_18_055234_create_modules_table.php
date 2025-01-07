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

        Schema::create('modules', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->integer('sequence')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('module_permissions', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->bigInteger('module_id')->unsigned()->nullable();
            $table->bigInteger('permission_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('module_id')->references('id')->on('modules')->onDelete('cascade');
            $table->foreign('permission_id')->references('id')->on('permissions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('modules');
        Schema::dropIfExists('module_permissions');
    }
};
