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
        ];

        foreach ($studyAreas as $area) {
            StudyArea::create(['name' => $area]);
        }
    }
}
