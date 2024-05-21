<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;
use App\Models\ExamQuestion;
use App\Models\Subject;

class ExamQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Exam::all()->each(function (Exam $exam) {
            foreach (range(1, 20) as $questionNumber) {
                ExamQuestion::factory()->create([
                    'exam_id' => $exam->id,
                    'question_number' => $questionNumber,
                ]);
            }
        });
    }
}