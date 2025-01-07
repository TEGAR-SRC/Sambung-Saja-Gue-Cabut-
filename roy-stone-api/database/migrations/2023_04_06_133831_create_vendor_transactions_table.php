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
        Schema::create('vendor_transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vendor_wallet_id')->nullable();
            $table->unsignedBigInteger('vendor_id')->nullable();
            $table->decimal('amount',8,2)->default(0.0);
            $table->enum('type',['credit','debit'])->nullable();
            $table->string('detail')->nullable();
            $table->unsignedBigInteger('from')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('vendor_wallet_id')->references('id')->on('vendor_wallets')->onDelete('cascade');
            $table->foreign('vendor_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('from')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendor_transactions');
    }
};
