<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('instrument_criteria', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("instrument_id");
            $table->string("title");
            $table->double("max_score");
            $table->timestamps();

            $table->foreign("instrument_id")->references("id")->on("instruments")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instrument_criteria');
    }
};
