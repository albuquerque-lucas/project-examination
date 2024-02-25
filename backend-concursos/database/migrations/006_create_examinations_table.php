<?php

use App\Models\EducationalLevel;
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
            $table->foreignIdFor(EducationalLevel::class); // Nivel de escolaridade exigido pelo concurso;
            $table->string('title'); // Título do concurso
            $table->boolean('active')->default(false); // Indica se o concurso está ativo
            $table->string('institution')->nullable()->default(null); // Instituição responsável pelo concurso
            $table->string('educational_level')->nullable()->default(null); // Nivel de escolaridade exigido pelo concurso
            $table->string('study_area')->nullable()->default(null); // Area de estudo e atuacao do concurso
            $table->date('registration_start_date')->nullable()->default(null); // Data de início do período de inscrição
            $table->date('registration_end_date')->nullable()->default(null);   // Data de término do período de inscrição
            $table->date('exams_start_date')->nullable()->default(null);      // Data de início do período de provas
            $table->date('exams_end_date')->nullable()->default(null);        // Data de término do período de provas
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


