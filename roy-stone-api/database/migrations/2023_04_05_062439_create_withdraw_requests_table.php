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
        Schema::create('withdraw_requests', function (Blueprint $table) {
            $table->id();
            $table->decimal('amount',8,2)->default(0.0)->nullable();
            $table->string('message')->nullable();
            $table->enum('status', ['pending', 'approved', 'rejected'])->nullable()->default('pending');
            $table->unsignedBigInteger('vendor_wallet_id')->nullable();
            $table->unsignedBigInteger('vendor_id')->nullable();
            $table->enum('payment_type', ['paypal', 'bank'])->nullable()->default('bank');
            $table->integer('is_used')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('vendor_wallet_id')->references('id')->on('vendor_wallets')->onDelete('cascade');
            $table->foreign('vendor_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdraw_requests');
    }
};
