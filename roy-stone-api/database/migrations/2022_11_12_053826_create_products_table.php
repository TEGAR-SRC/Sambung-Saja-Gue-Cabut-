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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->longText('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->enum('type',['simple','classified'])->nullable();
            $table->string('unit')->nullable();
            $table->integer('weight')->nullable();
            $table->integer('quantity')->nullable();
            $table->decimal('price')->nullable();
            $table->decimal('sale_price')->nullable();
            $table->decimal('discount')->nullable();
            $table->integer('is_featured')->default(0)->nullable();
            $table->integer('shipping_days')->default(0)->nullable();
            $table->integer('is_cod')->default(0);
            $table->integer('is_free_shipping')->default(0)->nullable();
            $table->integer('is_sale_enable')->default(0)->nullable();
            $table->integer('is_return')->default(0)->nullable();
            $table->integer('is_trending')->default(0)->nullable();
            $table->integer('is_approved')->default(1)->nullable();
            $table->integer('is_external')->default(0)->nullable();
            $table->string('external_url')->nullable();
            $table->string('external_button_text')->nullable();
            $table->string('sale_starts_at')->nullable();
            $table->string('sale_expired_at')->nullable();
            $table->string('sku')->nullable();
            $table->integer('is_random_related_products')->default(0)->nullable();
            $table->enum('stock_status',['in_stock','out_of_stock'])->nullable();
            $table->string('meta_title')->nullable();
            $table->longText('meta_description')->nullable();
            $table->unsignedBigInteger('product_thumbnail_id')->nullable();
            $table->unsignedBigInteger('product_meta_image_id')->nullable();
            $table->unsignedBigInteger('size_chart_image_id')->nullable();
            $table->string('estimated_delivery_text')->nullable();
            $table->longText('return_policy_text')->nullable();
            $table->integer('safe_checkout')->default(1)->nullable();
            $table->integer('secure_checkout')->default(1)->nullable();
            $table->integer('social_share')->default(1)->nullable();
            $table->integer('encourage_order')->default(1)->nullable();
            $table->integer('encourage_view')->default(1)->nullable();
            $table->string('slug')->nullable();
            $table->integer('status')->default(1);
            $table->unsignedBigInteger('store_id')->nullable();
            $table->unsignedBigInteger('created_by_id')->nullable();
            $table->unsignedBigInteger('tax_id')->nullable();
            $table->enum('preview_type',['audio','video','url'])->nullable();
            $table->enum('product_type',['physical','digital','external']);
            $table->string('separator')->nullable();
            $table->integer('is_licensable')->default(0)->nullable();
            $table->string('preview_url')->nullable();
            $table->integer('watermark')->default(0);
            $table->string('watermark_position')->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->unsignedBigInteger('watermark_image_id')->nullable();
            $table->enum('wholesale_price_type',['fixed','percentage'])->nullable();
            $table->integer('is_licensekey_auto')->default(0)->nullable();
            $table->unsignedBigInteger('preview_audio_file_id')->nullable();
            $table->unsignedBigInteger('preview_video_file_id')->nullable();

            $table->softDeletes();
            $table->timestamps();

            $table->foreign('brand_id')->references('id')->on('brands')->onDelete('cascade');
            $table->foreign('product_thumbnail_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('size_chart_image_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('product_meta_image_id')->references('id')->on('attachments')->onDelete('cascade');
            $table->foreign('tax_id')->references('id')->on('taxes')->onDelete('cascade');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('watermark_image_id')->references('id')->on('attachments')->onDelete('cascade');
        });

        Schema::create('wholesales', function (Blueprint $table)
        {
            $table->id();
            $table->integer('min_qty')->nullable();
            $table->integer('max_qty')->nullable();
            $table->integer('value')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });

        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('attachment_id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
            $table->foreign('attachment_id')->references('id')->on('attachments')->onDelete('cascade')->nullable();
        });

        Schema::create('product_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id');
            $table->unsignedBigInteger('category_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
            $table->foreign('category_id')->references('id')->on('categories')->onDelete('cascade')->nullable();
        });

        Schema::create('product_tags', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tag_id');
            $table->unsignedBigInteger('product_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('tag_id')->references('id')->on('tags')->onDelete('cascade')->nullable();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
        });

        Schema::create('product_attributes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attribute_id');
            $table->unsignedBigInteger('product_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
            $table->foreign('attribute_id')->references('id')->on('attributes')->onDelete('cascade')->nullable();
        });

        Schema::create('variations', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->decimal('price',8,2)->nullable();
            $table->integer('quantity')->nullable();
            $table->enum('stock_status',['in_stock','out_of_stock','coming_soon'])->nullable();
            $table->decimal('sale_price',8,2)->nullable();
            $table->decimal('discount',8,2)->nullable();
            $table->string('sku')->nullable();
            $table->integer('status')->default(1);
            $table->json('variation_options')->nullable();
            $table->string('preview_url')->nullable();
            $table->string('separator')->nullable();
            $table->integer('is_licensable')->nullable();
            $table->integer('is_licensekey_auto')->nullable();
            $table->unsignedBigInteger('variation_image_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('variation_image_id')->references('id')->on('attachments')->onDelete('cascade')->nullable();
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
        });

        Schema::create('variation_attribute_values', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attribute_value_id');
            $table->unsignedBigInteger('variation_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('variation_id')->references('id')->on('variations')->onDelete('cascade')->nullable();
            $table->foreign('attribute_value_id')->references('id')->on('attribute_values')->onDelete('cascade')->nullable();
        });

        Schema::create('variation_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('attachment_id');
            $table->unsignedBigInteger('variation_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('variation_id')->references('id')->on('variations')->onDelete('cascade')->nullable();
            $table->foreign('attachment_id')->references('id')->on('attachments')->onDelete('cascade')->nullable();
        });

        Schema::create('related_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('related_product_id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
            $table->foreign('related_product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
        });

        Schema::create('cross_sell_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('cross_sell_product_id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
            $table->foreign('cross_sell_product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
        });

        Schema::create('product_digital_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('variation_id')->nullable();
            $table->unsignedBigInteger('attachment_id')->nullable();
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade')->nullable();
            $table->foreign('variation_id')->references('id')->on('variations')->onDelete('cascade')->nullable();
            $table->foreign('attachment_id')->references('id')->on('attachments')->onDelete('cascade')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('products');
        Schema::dropIfExists('product_categories');
        Schema::dropIfExists('product_attributes');
        Schema::dropIfExists('product_tags');
        Schema::dropIfExists('variations');
        Schema::dropIfExists('variation_images');
        Schema::dropIfExists('related_products');
        Schema::dropIfExists('cross_sell_products');
    }
};
