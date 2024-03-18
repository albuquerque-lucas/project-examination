<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssociateExamsToSubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $exams = Exam::all();

        foreach ($exams as $exam) {
            $subjects = Subject::inRandomOrder()->limit(2)->pluck('id');
            $exam->subjects()->attach($subjects);
        }
    }
}
