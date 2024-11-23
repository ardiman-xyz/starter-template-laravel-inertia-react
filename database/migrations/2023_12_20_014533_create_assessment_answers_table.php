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
        Schema::create('assessment_answers', function (Blueprint $table) {
            $table->id();
            $table->uuid("assessment_id");
            $table->unsignedBigInteger("component_id")->nullable();
            $table->string("component_name")->nullable();
            $table->text("answer");
            $table->longText("notes")->nullable();
            $table->dateTime("created_at");

            $table->foreign("assessment_id")->references("id")->on("assessments");
            $table->foreign("component_id")->references("id")->on("components");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_answers');
    }
};
