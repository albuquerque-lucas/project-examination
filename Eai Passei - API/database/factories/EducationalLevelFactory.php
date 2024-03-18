<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\EducationalLevel>
 */
class EducationalLevelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $educationalLevelList = [
            'Fundamental', 'Ensino Medio', 'Graduacao', 'Pos-Graduacao', 'Mestrado', 'Doutorado', 'Tecnico'
        ];
        return [
            'name' => $this->faker->randomElement($educationalLevelList)
        ];
    }
}
