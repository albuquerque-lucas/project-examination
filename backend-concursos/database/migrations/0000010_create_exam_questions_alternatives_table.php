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
        Schema::create('exam_questions_alternatives', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignId('exam_questions')
                ->constrained()
                ->cascadeOnDelete();
            $table->string('letter');
            $table->string('text');
            $table->boolean('is_answer')->default(false);
            $table->timestamps();

            $table->index('is_answer');
            $table->index('letter');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_questions_alternatives');
    }
};
