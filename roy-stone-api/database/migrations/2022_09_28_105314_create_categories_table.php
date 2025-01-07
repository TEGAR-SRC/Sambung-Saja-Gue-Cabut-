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
        Schema::create('categories', function (Blueprint $table)
        {
            $table->id();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->string('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->longText('description')->nullable();
            $table->unsignedBigInteger('category_meta_image_id')->nullable();
            $table->unsignedBigInteger('category_image_id')->nullable();
            $table->unsignedBigInteger('category_icon_id')->nullable();
            $table->integer('status')->default(1);
            $table->string('type')->default('post');
            $table->decimal('commission_rate',8,2)->default(0.0)->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('category_image_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('category_meta_image_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('category_icon_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('categories')->onDelete('cascade');
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
        Schema::dropIfExists('categories');
    }
};
