<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;
use Hash;
use Str;
use App\Models\AccountPlan;

class UserFactory extends Factory
{
    protected static ?string $password;

        /**
     * Obtém IDs dos planos de conta existentes.
     *
     * @return array
     */
    private function getAccountPlanIds(): array
    {
        return AccountPlan::pluck('id')->toArray();
    }

    public function definition(): array
    {
        return [
            'account_plan_id' => 1,
            'first_name' => $this->faker->firstName,
            'last_name' => $this->faker->lastName,
            'username' => $this->faker->unique()->userName,
            "profile_img" => null,
            'email' => $this->faker->unique()->safeEmail,
            'phone_number' => $this->faker->unique()->phoneNumber,
            'password' => Hash::make('senha'),
        ];
    }

    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}

