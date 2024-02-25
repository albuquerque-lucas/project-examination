<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\ExamQuestion;
use App\Models\ExamQuestionAlternative;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        {
            ExamQuestion::all()->each(function (ExamQuestion $examQuestion) {
                $options = ['a', 'b', 'c', 'd', 'e'];
                shuffle($options);
    
                foreach ($options as $key => $letter) {
                    $isAnswer = $key === 0; // A primeira opção será a correta
    
                    ExamQuestionAlternative::factory()->create([
                        'exam_questions' => $examQuestion->id,
                        'letter' => $letter,
                        'text' => "Alternative $letter Text", // Pode ajustar conforme necessário
                        'is_answer' => $isAnswer,
                    ]);
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_questions_alternatives');
    }
};
