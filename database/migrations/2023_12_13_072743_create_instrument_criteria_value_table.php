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
        Schema::create('instrument_criteria_values', function (Blueprint $table) {
            $table->id();
            $table->uuid("assessment_id");
            $table->unsignedBigInteger("instrument_id");
            $table->unsignedBigInteger("instrument_criteria_id");
            $table->string("response")->nullable();
            $table->timestamps();

            $table->foreign("assessment_id")->references("id")->on("assessments");
            $table->foreign("instrument_id")->references("id")->on("instruments");
            $table->foreign("instrument_criteria_id")->references("id")->on("instrument_criteria");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instrument_criteria_values');
    }
};
