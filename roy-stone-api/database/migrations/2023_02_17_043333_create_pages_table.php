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
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->longText('title')->nullable();
            $table->string('slug', 191)->unique()->nullable();
            $table->longText('content')->nullable();
            $table->text('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->unsignedBigInteger('page_meta_image_id')->nullable();
            $table->integer('status')->default(1);
            $table->bigInteger('created_by_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('page_meta_image_id')->references('id')->on('attachments')->onDelete('cascade')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pages');
    }
};
