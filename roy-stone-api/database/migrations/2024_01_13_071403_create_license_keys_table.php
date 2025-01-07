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
        Schema::create('license_keys', function (Blueprint $table) {
            $table->id();
            $table->string('license_key')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('variation_id')->nullable();
            $table->unsignedBigInteger('purchased_by_id')->nullable();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->unsignedBigInteger('created_by_id')->nullable();
            $table->integer('status')->default(1);
            $table->timestamp('purchased_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('variation_id')->references('id')->on('variations')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('purchased_by_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('download_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('variation_id')->nullable();
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->unsignedBigInteger('license_key_id')->nullable();
            $table->string('token')->nullable();
            $table->timestamp('downloaded_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('variation_id')->references('id')->on('variations')->onDelete('cascade');
            $table->foreign('consumer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('license_key_id')->references('id')->on('license_keys')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('license_keys');
        Schema::dropIfExists('download_files');
    }
};
