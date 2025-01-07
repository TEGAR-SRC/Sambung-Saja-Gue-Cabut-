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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('store_name')->nullable();
            $table->longText('description')->nullable();
            $table->string('slug')->nullable();
            $table->bigInteger('store_logo_id')->unsigned()->nullable();
            $table->bigInteger('store_cover_id')->unsigned()->nullable();
            $table->bigInteger('country_id')->unsigned()->nullable();
            $table->bigInteger('state_id')->unsigned()->nullable();
            $table->string('city')->nullable();
            $table->string('address')->nullable();
            $table->string('pincode')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('instagram')->nullable();
            $table->string('youtube')->nullable();
            $table->string('pinterest')->nullable();
            $table->integer('hide_vendor_email')->default(1)->nullable();
            $table->integer('hide_vendor_phone')->default(1)->nullable();
            $table->bigInteger('vendor_id')->unsigned()->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->integer('status')->default(1);
            $table->integer('is_approved')->default(1)->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('store_logo_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('store_cover_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('state_id')->references('id')->on('states')->onDelete('cascade');
            $table->foreign('vendor_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('stores');
    }
};
