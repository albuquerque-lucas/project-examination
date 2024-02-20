<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'user',
        'account_plan',
    ];

    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }

    public function accountPlan(): HasOne
    {
        return $this->hasOne(AccountPlan::class);
    }
}
