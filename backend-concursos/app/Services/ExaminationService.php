<?php

namespace App\Services;

use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;

class ExaminationService
{
    private $serviceResponse;

    public function __construct()
    {
        $this->serviceResponse = new ServiceResponse();
    }

    public function getAll(): ServiceResponse
    {
        try {
            $examinations = Examination::all();
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(500, (object)['error' => $exception->getMessage()]);
            return $this->serviceResponse;
        }
    }
}
