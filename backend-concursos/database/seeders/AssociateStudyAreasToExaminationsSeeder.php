<?php

namespace Database\Seeders;

use App\Models\Examination;
use App\Models\StudyArea;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AssociateStudyAreasToExaminationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $examinations = Examination::all();

        foreach ($examinations as $examination) {
            $studyAreas = StudyArea::inRandomOrder()->limit(6)->pluck('id');
            $examination->studyAreas()->attach($studyAreas);
        }
    }
}
