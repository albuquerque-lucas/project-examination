<?php

namespace Database\Seeders;

use App\Models\EducationalLevel;
use Illuminate\Database\Seeder;
use App\Models\Examination;

class ExaminationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EducationalLevel::all()->each(function(EducationalLevel $educationalLevel) {
            Examination::factory()->count(5)->create([
                'educational_level_id' => $educationalLevel->id,
            ]);
        });
    }
}
