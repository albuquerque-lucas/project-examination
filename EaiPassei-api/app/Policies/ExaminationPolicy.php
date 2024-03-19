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

    public function getAll(User $user)
    {
        return $user->isTeacher();
    }
}
