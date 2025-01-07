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
        Schema::create('notices', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->longText('description')->nullable();
            $table->enum('priority',['low','medium','high'])->nullable();
            $table->unsignedBigInteger('created_by_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade')->nullable();
        });

        Schema::create('notice_reads', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('notice_id');
            $table->unsignedBigInteger('user_id');
            $table->integer('is_read')->default(0);

            $table->foreign('notice_id')->references('id')->on('notices')->onDelete('cascade')->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notices');
        Schema::dropIfExists('notice_reads');
    }
};
