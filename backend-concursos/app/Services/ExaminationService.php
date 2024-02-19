<?php

namespace App\Services;

use App\Models\Examination;

class ExaminationService
{
    public function getAll()
    {
        return Examination::all();
    }
}