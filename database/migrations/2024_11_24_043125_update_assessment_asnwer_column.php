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
        Schema::table('assessment_answers', function (Blueprint $table) {
            $table->float('progress')->nullable(); 
            $table->integer('percentage')->default(0); 
            $table->integer('last_checkpoint')->default(0);
            $table->boolean('is_done')->default(false); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('assessment_answers', function (Blueprint $table) {
            $table->dropColumn(['progress', 'percentage', 'last_checkpoint', 'is_done']);
        });
    }
};
