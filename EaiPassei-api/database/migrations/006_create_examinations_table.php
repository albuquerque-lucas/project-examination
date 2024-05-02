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
            $table->string('title')->unique(); // Título do concurso
            $table->boolean('active')->default(false); // Indica se o concurso está ativo
            $table->string('institution')->nullable()->default(null); // Instituição responsável pelo concurso
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


