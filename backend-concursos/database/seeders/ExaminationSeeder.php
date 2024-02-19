<?php

namespace Database\Seeders;

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
        // Define a quantidade desejada de registros
        $numberOfRecords = 20;

        // Utiliza o loop para criar os registros
        for ($i = 1; $i <= $numberOfRecords; $i++) {
            Examination::create([
                'title' => "Concurso {$i}",
                'active' => rand(0, 1),
                'notice' => null,
                'institution' => "Instituição {$i}",
                'exam_date' => now()->addDays($i),
            ]);
        }
    }
}
