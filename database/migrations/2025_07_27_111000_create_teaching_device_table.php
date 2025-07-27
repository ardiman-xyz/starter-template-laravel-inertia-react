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
       Schema::create('teaching_devices', function (Blueprint $table) {
            $table->id();
            $table->string('assessment_id'); // Foreign key ke assessments table
            $table->string('name'); // Nama perangkat (contoh: "Perangkat Pembelajaran")
            $table->text('description')->nullable(); // Deskripsi perangkat
            $table->boolean('is_required')->default(true); // Apakah wajib atau tidak
            $table->boolean('is_uploaded')->default(false); // Status upload
            $table->string('file_name')->nullable(); // Nama file yang diupload
            $table->string('file_path')->nullable(); // Path file di storage
            $table->string('file_size')->nullable(); // Ukuran file
            $table->string('file_type')->nullable(); // Tipe file (pdf, doc, etc)
            $table->timestamp('uploaded_at')->nullable(); // Waktu upload
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('assessment_id')->references('id')->on('assessments')->onDelete('cascade');
            
            // Index untuk performance
            $table->index(['assessment_id', 'is_uploaded']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teaching_devices');
    }
};
