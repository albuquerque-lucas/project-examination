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
        'user_id',           // Relação de um para um com a Model User
        'account_plan_id',   // Relação de um para um com a Model AccountPlan
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
