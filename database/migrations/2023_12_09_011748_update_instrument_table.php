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
        Schema::table('instruments', function (Blueprint $table) {
            $table->longText("description")->after("type")->nullable();
            $table->text("allowed_extension")->after("description")->nullable();
            $table->integer("max_size")->after("allowed_extension")->nullable();
            $table->boolean("is_multiple")->after("max_size")->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('instruments', function (Blueprint $table) {
            $table->removeColumn("description");
            $table->removeColumn("allowed_extension");
            $table->removeColumn("max_size");
            $table->removeColumn("is_multiple");
        });
    }
};
