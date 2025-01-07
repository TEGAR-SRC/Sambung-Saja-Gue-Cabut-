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
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->string('code')->nullable();
            $table->enum('type', ['fixed', 'free_shipping', 'percentage'])->default('fixed')->nullable();
            $table->decimal('amount', 15)->default(0)->nullable();
            $table->decimal('min_spend', 15)->default(0)->nullable();
            $table->integer('is_unlimited')->default(1)->nullable();
            $table->integer('usage_per_coupon')->default(0)->nullable();
            $table->integer('usage_per_customer')->default(0)->nullable();
            $table->integer('used')->default(0)->nullable();
            $table->integer('status')->default(1)->nullable();
            $table->integer('is_expired')->default(0)->nullable();
            $table->integer('is_apply_all')->default(0)->nullable();
            $table->integer('is_first_order')->default(0)->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });


        Schema::create('product_coupons', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('coupon_id')->unsigned()->nullable();
            $table->bigInteger('product_id')->unsigned()->nullable();

            $table->foreign('coupon_id')->references('id')->on('coupons')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });

        Schema::create('exclude_product_coupons', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('coupon_id')->unsigned()->nullable();
            $table->bigInteger('product_id')->unsigned()->nullable();

            $table->foreign('coupon_id')->references('id')->on('coupons')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coupons');
        Schema::dropIfExists('coupon_products');
        Schema::dropIfExists('exclude_product_coupons');
    }
};
