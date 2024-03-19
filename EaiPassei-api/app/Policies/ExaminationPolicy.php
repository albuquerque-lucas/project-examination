<?php

namespace App\Policies;

use App\Models\User;

class ExaminationPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function create(User $user)
    {
        $allowedAccessLevel = 4;
        $accessLevel = $user->accountPlan->accessLevel->level;

        return $accessLevel >= $allowedAccessLevel;
    }
}
