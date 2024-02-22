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
        $firstName = $this->faker->firstName;
        $lastName = $this->faker->lastName;
        $fullName = "$firstName $lastName";

        return [
            'account_plan_id' => $this->faker->randomElement($this->getAccountPlanIds()),
            'first_name' => $firstName,
            'last_name' => $lastName,
            'name' => $fullName,
            'username' => $this->faker->unique()->userName,
            'email' => $this->faker->unique()->safeEmail,
            'phone_number' => $this->faker->phoneNumber,
            'email_verified_at' => now(),
            'username_verified_at' => now(),
            'password' => Hash::make('senha'), // Altere 'senha' conforme necessário
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

