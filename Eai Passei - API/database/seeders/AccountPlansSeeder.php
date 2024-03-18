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
            'description' => 'Descrição do plano Regular',
            'price' => 19.99,
            'duration_days' => 30,
        ]);

        AccountPlan::create([
            'name' => 'Premium',
            'description' => 'Descrição do plano Premium',
            'price' => 39.99,
            'duration_days' => 60,
        ]);

        AccountPlan::create([
            'name' => 'Premium Plus',
            'description' => 'Descrição do plano Premium Plus',
            'price' => 59.99,
            'duration_days' => 90,
        ]);
    }
}
