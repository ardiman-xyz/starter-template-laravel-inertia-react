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
        Schema::create('assessments', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid("school_id");
            $table->unsignedBigInteger("teacher_id");
            $table->unsignedBigInteger("academic_semester_id");
            $table->string("title")->nullable();

            $table->timestamps();

            $table->foreign("school_id")->references("id")->on("schools");
            $table->foreign("teacher_id")->references("id")->on("users");
            $table->foreign("academic_semester_id")->references("id")->on("academic_semesters");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessments');
    }
};
