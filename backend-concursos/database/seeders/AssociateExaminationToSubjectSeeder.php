<?php

namespace Database\Seeders;

use App\Models\Examination;
use App\Models\Subject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssociateExaminationToSubjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $examinations = Examination::all();

        foreach ($examinations as $examination) {
            $subjects = Subject::inRandomOrder(6)->pluck('id');
            $examination->subjects()->attach($subjects);
        }
    }
}
