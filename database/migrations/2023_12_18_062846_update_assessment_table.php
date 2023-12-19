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
        Schema::table('assessments', function (Blueprint $table) {
            $table->enum("status", ["schedule", "finish"])->default("schedule")->after("title");
            $table->string("started_at")->after("status");
            $table->string("finished_at")->after("started_at");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assessments', function (Blueprint $table) {
            $table->removeColumn("status");
            $table->removeColumn("started_at");
            $table->removeColumn("finished_at");
        });
    }
};
