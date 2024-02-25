<?php

namespace Database\Seeders;

use App\Models\StudyArea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subject;
use App\Models\Exam;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StudyArea::all()->each(function(StudyArea $studyArea) {
            $exams = Exam::pluck('id')->toArray();
            Subject::factory()->count(8)->create([
                'study_area_id' => $studyArea->id,
                'exam_id' => function() use ($exams) {
                    return array_rand(array_flip($exams));
                },
            ]);
        });
    }
}
