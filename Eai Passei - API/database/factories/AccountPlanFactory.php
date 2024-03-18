<?php

namespace Database\Factories;

use App\Models\AccountPlan;
use Illuminate\Database\Eloquent\Factories\Factory;

class AccountPlanFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word, // Nome do plano (ex: Plano Regular, Plano Premium, etc.)
            'description' => $this->faker->text, // Descrição do plano (pode ser nulo)
            'price' => $this->faker->randomFloat(2, 0, 100), // Preço do plano
            'duration_days' => $this->faker->numberBetween(1, 365), // Duração do plano em dias (pode ser nulo)
        ];
    }
}
