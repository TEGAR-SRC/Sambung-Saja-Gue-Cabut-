<?php

use App\Enums\PaymentStatus;
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
        Schema::create('order_status', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('slug')->nullable();
            $table->integer('sequence')->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->integer('status')->default(1);
            $table->integer('system_reserve')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->integer('order_number')->startingValue(1000)->unique()->nullable();
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->decimal('tax_total',8,4)->nullable();
            $table->decimal('shipping_total',8,4)->nullable();
            $table->decimal('points_amount',8,4)->nullable();
            $table->decimal('wallet_balance',8,4)->nullable();
            $table->decimal('amount',8,4)->nullable();
            $table->decimal('total',8,4)->nullable();
            $table->integer('is_digital_only')->default(1)->nullable();
            $table->decimal('coupon_total_discount',8,2)->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_status')->nullable()->default(PaymentStatus::PENDING);
            $table->unsignedBigInteger('store_id')->nullable();
            $table->json('billing_address')->nullable();
            $table->json('shipping_address')->nullable();
            $table->json('consumer')->nullable();
            $table->string('delivery_description')->nullable();
            $table->string('delivery_interval')->nullable();
            $table->unsignedBigInteger('order_status_id')->nullable();
            $table->unsignedBigInteger('coupon_id')->nullable();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();
            $table->string('invoice_url')->nullable();
            $table->integer('is_guest')->default(0);
            $table->integer('status')->default(1);
            $table->longText('note')->nullable();
            $table->timestamp('delivered_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
            $table->foreign('parent_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('coupon_id')->references('id')->on('coupons')->onDelete('cascade');
            $table->foreign('consumer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('order_status_id')->references('id')->on('order_status')->onDelete('cascade');
        });

        Schema::create('order_products', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('product_id');
            $table->enum('product_type',['physical','digital','external']);
            $table->unsignedBigInteger('variation_id')->nullable();
            $table->integer('quantity')->nullable();
            $table->decimal('single_price',8,4)->nullable();
            $table->decimal('shipping_cost',8,4)->nullable();
            $table->decimal('tax',8,4)->nullable();
            $table->decimal('wholesale_price',8,4)->default(0);
            $table->decimal('subtotal',8,4)->nullable();
            $table->string('refund_status')->nullable();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('variation_id')->references('id')->on('variations')->onDelete('cascade');
        });

        Schema::create('order_transactions', function (Blueprint $table) {
            $table->id();
            $table->string('transaction_id')->nullable();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('order_statuses');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('order_products');
        Schema::dropIfExists('order_transactions');
    }
};
