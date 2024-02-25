<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Exam;
use App\Models\ExamQuestion;

class ExamQuestionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Exam::all()->each(function (Exam $exam) {
            ExamQuestion::factory(20)->create([
                'exam_id' => $exam->id,
            ]);
        });
    }
}
