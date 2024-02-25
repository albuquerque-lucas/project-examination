<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use App\Models\StudyArea;
use Illuminate\Database\Seeder;
use App\Models\Subject;

class SubjectsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StudyArea::all()->each(function(StudyArea $studyArea) {
            $educationalLevels = EducationalLevel::pluck('id')->toArray();
            Subject::factory()->count(8)->create([
                'study_area_id' => $studyArea->id,
                'educational_level_id' => function() use ($educationalLevels) {
                    return array_rand(array_flip($educationalLevels));
                },
            ]);
        });
    }
}
