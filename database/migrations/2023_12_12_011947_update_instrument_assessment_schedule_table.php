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
        Schema::table('instrument_assessment_schedules', function (Blueprint $table) {
            $table->enum("status", ["schedule", "finish"])->default("schedule")->after("instrument_id");
            $table->dateTime("started_at")->after("status");
            $table->dateTime("finished_at")->nullable()->after("started_at");;
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('instrument_assessment_schedules', function (Blueprint $table) {
            $table->removeColumn("status");
            $table->removeColumn("started_at");
            $table->removeColumn("finished_at");
        });
    }
};
