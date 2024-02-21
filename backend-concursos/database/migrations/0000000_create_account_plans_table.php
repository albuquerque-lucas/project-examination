<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('account_plans', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Nome do plano (ex: Plano Regular, Plano Premium, etc.)
            $table->text('description')->nullable(); // Descrição do plano (pode ser nulo)
            $table->decimal('price', 10, 2); // Preço do plano
            $table->integer('duration_days')->nullable(); // Duração do plano em dias (pode ser nulo)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('account_plans');
    }
};
