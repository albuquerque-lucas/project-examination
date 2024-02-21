<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\AccountPlan;
use App\Models\User;

class AccountFactory extends Factory
{
    private static $uniqueSuffix = 1;

    public function definition(): array
    {
        // Obter IDs de usuários existentes
        $userIds = User::pluck('id')->toArray();

        // Garantir que haja pelo menos um usuário disponível
        $userId = count($userIds) > 0 ? $this->faker->unique()->randomElement($userIds) : User::factory();

        // Determina os planos de conta existentes
        $accountPlanIds = AccountPlan::pluck('id')->toArray();

        $accountName = $this->faker->unique()->word;

        return [
            'user_id' => $userId,
            'account_plan_id' => $this->faker->randomElement($accountPlanIds),
            'account_name' => $accountName . '-' . self::$uniqueSuffix++,
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}


