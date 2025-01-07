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
        Schema::create('refunds', function (Blueprint $table) {
            $table->id();
            $table->string('reason')->nullable();
            $table->decimal('amount',8,2)->default(0.0)->nullable();
            $table->integer('quantity')->default(0)->nullable();
            $table->unsignedBigInteger('store_id')->nullable();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->unsignedBigInteger('variation_id')->nullable();
            $table->unsignedBigInteger('refund_image_id')->nullable();
            $table->enum('payment_type', ['wallet','paypal','bank'])->nullable()->default('wallet');
            $table->enum('status', ['pending', 'approved', 'rejected'])->nullable()->default('pending');
            $table->integer('is_used')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('consumer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('variation_id')->references('id')->on('variations')->onDelete('cascade');
            $table->foreign('refund_image_id')->references('id')->on('attachments')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refunds');
    }
};
