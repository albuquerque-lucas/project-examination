<?php

namespace Database\Seeders;

use App\Models\AccessLevel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AccessLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for( $i = 0; $i < 5; $i++ ) {
            AccessLevel::create([
                'name' => "Nível $i",
                'level' => $i,
                'description' => "Nível de acesso $i"
            ]);
        };
    }
}
