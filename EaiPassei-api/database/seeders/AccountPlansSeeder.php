<?php

namespace Database\Seeders;

use App\Models\AccountPlan;
use Illuminate\Database\Seeder;

class AccountPlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        AccountPlan::create([
            'name' => 'Regular',
            'access_level_id' => 1,
            'description' => 'Descrição do plano Regular',
            'price' => 19.99,
            'duration_days' => 30,
            'is_public' => true
        ]);

        AccountPlan::create([
            'name' => 'Premium',
            'access_level_id' => 2,
            'description' => 'Descrição do plano Premium',
            'price' => 39.99,
            'duration_days' => 60,
            'is_public' => true
        ]);

        AccountPlan::create([
            'name' => 'Premium Plus',
            'access_level_id' => 3,
            'description' => 'Descrição do plano Premium Plus',
            'price' => 59.99,
            'duration_days' => 90,
            'is_public' => true
        ]);

        AccountPlan::create([
            'name' => 'Admin',
            'access_level_id' => 5,
            'description' => 'Descrição do plano Master Admin',
            'price' => 00.00,
            'duration_days' => null,
            'is_public' => false
        ]);
    }
}
