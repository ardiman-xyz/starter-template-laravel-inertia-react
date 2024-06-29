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
        Schema::table('schools', function (Blueprint $table) {
            $table->string("npsn")->nullable()->after("address");
            $table->string("education_level")->nullable()->after("npsn");
            $table->enum("status", ["swasta", "negeri"])->nullable()->after("education_level");
            $table->string("email")->nullable()->after("status");
            $table->string("school_image")->nullable()->after("email");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('schools', function (Blueprint $table) {
            $table->dropColumn(["npsn", "education_level", "status", "email", "school_image"]);
        });
    }
};
