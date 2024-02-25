<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;
use App\Models\Topic;

class TopicsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Subject::all()->each(function(Subject $subject) {
            Topic::factory()->count(4)->create([
                'subject_id' => $subject->id,
            ]);
        });
    }
}
