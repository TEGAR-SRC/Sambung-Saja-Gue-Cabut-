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
        Schema::create('blogs', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->string('slug', 191)->unique()->nullable();
            $table->longText('description')->nullable();
            $table->longText('content')->nullable();
            $table->text('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->unsignedBigInteger('blog_thumbnail_id')->nullable();
            $table->unsignedBigInteger('blog_meta_image_id')->nullable();
            $table->integer('is_featured')->default(0);
            $table->integer('is_sticky')->default(0);
            $table->integer('status')->default(1);
            $table->unsignedBigInteger('created_by_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('blog_thumbnail_id')->references('id')->on('attachments')->onDelete('cascade')->nullable();
            $table->foreign('blog_meta_image_id')->references('id')->on('attachments')->onDelete('cascade')->nullable();
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade')->nullable();
        });

        Schema::create('blog_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('blog_id')->unsigned();
            $table->unsignedBigInteger('category_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->nullable();
        });

        Schema::create('blog_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('blog_id')->unsigned();
            $table->unsignedBigInteger('tag_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade')->nullable();
            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('blogs');
        Schema::dropIfExists('blog_categories');
        Schema::dropIfExists('blog_tags');
    }
};
