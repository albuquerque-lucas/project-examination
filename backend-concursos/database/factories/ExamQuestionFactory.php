<?php

namespace Database\Factories;

use App\Models\Exam;
use App\Models\Subject;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ExamQuestion>
 */
class ExamQuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subjectIdList = range(1, 40);
        $topicIdList = range(1, 160);
        return [
            'title' => $this->faker->words(2, true),
            'description' => $this->faker->paragraph(3, true),
            'subject_id' => $this->faker->randomElement($subjectIdList),
            'topic_id' => $this->faker->randomElement($topicIdList),
        ];
    }
}
