<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AccessLevelSeeder::class,
            AccountPlansSeeder::class,
            UsersSeeder::class,
            EducationalLevelsSeeder::class,
            ExaminationSeeder::class,
            NoticesSeeder::class,
            StudyAreasSeeder::class,
            SubjectsSeeder::class,
            ExamsSeeder::class,
            TopicsSeeder::class,
            ExamQuestionsSeeder::class,
            ExamQuestionsAlternativesSeeder::class,
            AssociateExaminationsToStudyAreasSeeder::class,
            AssociateExamsToSubjectsSeeder::class,
            AssociateExaminationToUserSeeder::class,
        ]);
    }
}
