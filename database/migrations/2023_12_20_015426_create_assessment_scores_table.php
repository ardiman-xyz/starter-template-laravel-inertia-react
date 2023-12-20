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
        Schema::create('assessment_scores', function (Blueprint $table) {
            $table->id();
            $table->uuid("assessment_id");
            $table->unsignedBigInteger("component_id");
            $table->unsignedBigInteger("component_detail_id");
            $table->timestamps();

            $table->foreign("assessment_id")->references("id")->on("assessments");
            $table->foreign("component_id")->references("id")->on("components");
            $table->foreign("component_detail_id")->references("id")->on("component_details");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_scores');
    }
};
