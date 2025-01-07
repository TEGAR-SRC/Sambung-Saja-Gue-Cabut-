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
        Schema::create('question_and_answers', function (Blueprint $table) {
            $table->id();
            $table->longText('question')->nullable();
            $table->longText('answer')->nullable();
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->unsignedBigInteger('product_id')->nullable();
            $table->unsignedBigInteger('store_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('consumer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('product_id')->references('id')->on('products')->onDelete('cascade');
            $table->foreign('store_id')->references('id')->on('stores')->onDelete('cascade');
        });

        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->enum('reaction', ['liked', 'disliked'])->nullable();
            $table->unsignedBigInteger('consumer_id')->nullable();
            $table->unsignedBigInteger('question_and_answer_id')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('consumer_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('question_and_answer_id')->references('id')->on('question_and_answers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quention_and_answers');
        Schema::dropIfExists('feedbacks');
    }
};
