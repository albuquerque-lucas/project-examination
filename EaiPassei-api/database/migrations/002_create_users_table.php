<?php

use App\Models\AccessLevel;
use App\Models\AccountPlan;
use App\Models\Quota;
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
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(AccountPlan::class);
            $table->string('first_name');
            $table->string('last_name');
            $table->string('username')->unique();
            $table->string('email')->unique();
            $table->string('profile_img')->nullable();
            $table->string('phone_number')->unique();
            $table->string('password');
            $table->string('sex')->nullable();
            $table->string('sexual_orientation')->nullable();
            $table->string('gender')->nullable();
            $table->string('race')->nullable();
            $table->string('disability')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->timestamp('username_verified_at')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
