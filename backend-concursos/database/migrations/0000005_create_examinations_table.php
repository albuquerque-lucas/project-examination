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
        Schema::create('examinations', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Título do concurso
            $table->boolean('active')->default(false); // Indica se o concurso está ativo
            $table->binary('notice')->nullable(); // Edital do concurso (pode ser nulo)
            $table->string('institution'); // Instituição responsável pelo concurso
            $table->date('exam_date')->nullable(); // Data do exame do concurso (pode ser nulo)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examinations');
    }
};


