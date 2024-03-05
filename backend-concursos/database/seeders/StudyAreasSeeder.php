<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\StudyArea;

class StudyAreasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $studyAreas = [
            'Ensino Médio',
            'Direito',
            'Medicina',
            'Engenharia',
            'Economia',
            'Sociologia',
            'Psicologia',
            'Educação',
            'Tecnologia',
            'Finanças',
            'Filosofia',
            'Educação Física',
            'Segurança Pública',
            'Saúde Pública'
        ];

        foreach ($studyAreas as $area) {
            StudyArea::create(['name' => $area]);
        }
    }
}
