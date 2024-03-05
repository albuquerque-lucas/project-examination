<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Examination;

class AssociateExaminationToUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach($users as $user) {
            $examinations = Examination::inRandomOrder()->limit(2)->pluck('id');
            $user->examinations()->attach($examinations);
        }
    }
}
