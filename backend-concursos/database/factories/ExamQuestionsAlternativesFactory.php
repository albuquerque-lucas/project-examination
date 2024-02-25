<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ExamQuestionsAlternativesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $letterOptions = ['a', 'b', 'c', 'd', 'e'];
        shuffle($letterOptions);
        return [
            'letter' => $this->faker->randomElement($letterOptions),
            'text' => $this->faker->text(15),
            'is_answer' => false,
        ];
    }
}
