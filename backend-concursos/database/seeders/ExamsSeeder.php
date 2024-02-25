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
        Examination::all()->each(function(Examination $examination) {
            Exam::factory(3)->create([
                'examination_id' => $examination->id,
            ]);
        });
    }
}
