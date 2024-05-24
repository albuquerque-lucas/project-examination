<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(20)->create();
        User::factory(10)->create([
            'account_plan_id' => 2,
        ]);

        User::factory()->create([
            "account_plan_id"=> 4,
            "first_name"=> "Lucas",
            "last_name"=> "Albuquerque",
            "username"=> "lucas.albuquerque",
            "profile_img" => null,
            "email"=> "lucaslpra@gmail.com",
            "phone_number"=> "(32) 98867-3808",
            "password"=> Hash::make("123456"),
            "sex" => "Masculino",
            "sexual_orientation" => "Heterossexual",
            "gender" => "Cisgênero",
            "race" => "Branco",
            "disability" => null,
        ]);
    }
}
