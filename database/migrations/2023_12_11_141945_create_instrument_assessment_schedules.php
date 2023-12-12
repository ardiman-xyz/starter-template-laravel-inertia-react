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
        Schema::create('instrument_assessment_schedules', function (Blueprint $table) {
            $table->id();
            $table->uuid("assessment_id");
            $table->unsignedBigInteger("assessment_stage_id");
            $table->unsignedBigInteger("instrument_id");
            $table->timestamps();

            $table->foreign("assessment_id")->references("id")->on("assessments");
            $table->foreign("assessment_stage_id")->references("id")->on("assessment_stages");
            $table->foreign("instrument_id")->references("id")->on("instruments");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('instrument_assessment_schedules');
    }
};
