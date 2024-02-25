<?php

namespace Database\Factories;

use App\Models\Exam;
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
        $examsIds = Exam::pluck('id')->toArray();

        return [
            'exam_id' => $this->faker->randomElement($examsIds),
            'title' => $this->faker->words(2, true),
            'description' => $this->faker->paragraph(3, true),
        ];
    }
}
