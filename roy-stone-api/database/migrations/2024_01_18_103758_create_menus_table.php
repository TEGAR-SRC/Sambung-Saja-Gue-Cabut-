<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('menus', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->integer('sort')->nullable()->default(0);
            $table->string('link_type')->nullable();
            $table->integer('is_target_blank')->default(0)->nullable();
            $table->integer('mega_menu')->default(0);
            $table->string('mega_menu_type')->nullable();
            $table->string('slug')->nullable();
            $table->string('path')->nullable();
            $table->string('type')->nullable();
            $table->string('badge_text')->nullable();
            $table->string('badge_color')->nullable();
            $table->string('set_page_link')->nullable();
            $table->longText('content_item')->nullable();
            $table->unsignedBigInteger('item_image_id')->nullable();
            $table->unsignedBigInteger('banner_image_id')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('parent_id')->references('id')->on('menus')->onDelete('cascade');
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('banner_image_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('item_image_id')->references('id')->on('attachments')->onDelete('cascade');
        });

        Schema::create('menu_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('menu_id')->unsigned();
            $table->unsignedBigInteger('product_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade')->nullable();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
        });

        Schema::create('menu_blogs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('menu_id')->unsigned();
            $table->unsignedBigInteger('blog_id')->unsigned();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('menu_id')->references('id')->on('menus')->onDelete('cascade')->nullable();
            $table->foreign('blog_id')->references('id')->on('blogs')->onDelete('cascade')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('menus');
    }
};
