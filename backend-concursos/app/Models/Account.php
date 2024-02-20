<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'email',
        'password',
        'user_id',           // Relação de um para um com a Model User
        'account_plan_id',   // Relação de um para um com a Model AccountPlan
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
    
    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class);
    }

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function accountPlan(): HasOne
    {
        return $this->hasOne(AccountPlan::class);
    }

}
