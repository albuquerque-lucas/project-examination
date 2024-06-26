<?php

use App\Models\ExamQuestion;
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
        Schema::create('exam_question_alternatives', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(ExamQuestion::class)->constrained()->onDelete('cascade');
            $table->char('letter');
            $table->text('text')->nullable();
            $table->boolean('is_answer')->default(false);
            $table->timestamps();
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
