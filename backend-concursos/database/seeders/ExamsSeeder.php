<?php

namespace Database\Seeders;

use App\Models\Exam;
use App\Models\Examination;
use Illuminate\Database\Seeder;

class ExamsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Examination::all()->each(function(Exam $exam) {
            Exam::factory(3)->create([
                'exam_id' => $exam->id,
            ]);
        });
    }
}
