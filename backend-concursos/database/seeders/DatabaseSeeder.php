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
            AccountPlansSeeder::class,
            UsersSeeder::class,
            EducationalLevelsSeeder::class,
            ExaminationSeeder::class,
            NoticesSeeder::class,
            StudyAreasSeeder::class,
            SubjectsSeeder::class,
            ExamsSeeder::class,
            ExamQuestionsSeeder::class,
            ExamQuestionsAlternativesSeeder::class,
            TopicsSeeder::class,
            AssociateExaminationsToStudyAreasSeeder::class,
            AssociateExamsToSubjectsSeeder::class,
            AssociateExaminationToUserSeeder::class,
            AssociateExaminationToSubjectSeeder::class,
        ]);
    }
}
