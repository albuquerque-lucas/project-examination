<?php

namespace Database\Seeders;

use App\Models\Examination;
use App\Models\Notice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NoticesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Examination::all()->each(function(Examination $examination) {
            Notice::factory()->count(1)->create([
                'examination_id' => $examination->id,
            ]);
        });
    }
}
