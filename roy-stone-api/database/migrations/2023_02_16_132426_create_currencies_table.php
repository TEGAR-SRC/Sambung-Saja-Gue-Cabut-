<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('currencies', function (Blueprint $table) {
            $table->id();
            $table->string('code')->nullable();
            $table->string('symbol')->nullable();
            $table->decimal('no_of_decimal')->default(2)->nullable();
            $table->double('exchange_rate')->default(1)->nullable();
            $table->enum('symbol_position',['before_price','after_price'])->default('before_price')->nullable();
            $table->enum('thousands_separator',['comma','period','space'])->default('comma')->nullable();
            $table->enum('decimal_separator',['comma','period','space'])->default('comma')->nullable();
            $table->integer('system_reserve')->default(0);
            $table->integer('status')->default(1)->nullable();
            $table->bigInteger('created_by_id')->unsigned()->nullable();

            $table->timestamps();
            $table->softDeletes();
            $table->foreign('created_by_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('currencies');
    }
};
