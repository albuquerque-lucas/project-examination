<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

class UserFactory extends Factory
{
    protected static ?string $password;

    public function definition(): array
    {
        $fullName = $this->faker->name;
        $nameParts = explode(' ', $fullName, 2);

        return [
            'first_name' => $nameParts[0] ?? '',
            'last_name' => Arr::get($nameParts, 1, ''),
        ];
    }
}

