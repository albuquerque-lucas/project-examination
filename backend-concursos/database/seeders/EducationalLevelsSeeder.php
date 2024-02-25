<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EducationalLevel;

class EducationalLevelsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $educationalLevels = [
            'Nível Fundamental',
            'Nível Médio',
            'Nível Técnico',
            'Nível Superior',
            'Pós-Graduação',
        ];

        foreach ($educationalLevels as $level) {
            EducationalLevel::create(['name' => $level]);
        }
    }
}
