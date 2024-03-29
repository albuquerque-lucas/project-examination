<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class StudyAreasFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $studyAreasList = [
            'Direito',
            'Medicina',
            'Ensino Médio',
            'Economia',
            'Sociologia',
            'Psicologia'
        ];
        return [
            'area' => $this->faker->unique()->randomElement($studyAreasList),
        ];
    }
}
