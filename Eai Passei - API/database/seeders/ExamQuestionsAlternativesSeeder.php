<?php

namespace Database\Seeders;

use App\Models\ExamQuestion;
use App\Models\ExamQuestionAlternative;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExamQuestionsAlternativesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        ExamQuestion::all()->each(function (ExamQuestion $examQuestion) {
            ExamQuestionAlternative::factory(5)->create([
                'exam_question_id' => $examQuestion->id,
            ]);
        });
    }
}
