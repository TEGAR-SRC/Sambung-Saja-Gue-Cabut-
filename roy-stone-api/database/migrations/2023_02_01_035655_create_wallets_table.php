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
        Schema::create('wallets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->decimal('balance',8,2)->default(0.0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('consumer_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('points', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->decimal('balance',8,2)->default(0.0);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('consumer_id')->references('id')->on('users')->onDelete('cascade');
        });

        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wallet_id')->nullable();
            $table->unsignedBigInteger('order_id')->nullable();
            $table->unsignedBigInteger('point_id')->nullable();
            $table->decimal('amount',8,2)->default(0.0);
            $table->enum('type',['credit','debit'])->nullable();
            $table->string('detail')->nullable();
            $table->unsignedBigInteger('from')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('wallet_id')->references('id')->on('wallets')->onDelete('cascade');
            $table->foreign('order_id')->references('id')->on('orders')->onDelete('cascade');
            $table->foreign('point_id')->references('id')->on('points')->onDelete('cascade');
            $table->foreign('from')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wallets');
        Schema::dropIfExists('points');
        Schema::dropIfExists('transactions');
    }
};
