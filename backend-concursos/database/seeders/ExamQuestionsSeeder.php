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
        $subjectIdList = range(1, 40);
        $topicIdList = range(1, 160);
        Exam::all()->each(function (Exam $exam) use ($subjectIdList, $topicIdList) {
            ExamQuestion::factory(20)->create([
                'exam_id' => $exam->id,
                'subject_id' => rand(1, count($subjectIdList)),
                'topic_id' => rand(1, count($topicIdList))
            ]);
        });
    }
}
