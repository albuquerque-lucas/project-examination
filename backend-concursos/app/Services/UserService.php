<?php

namespace App\Services;
use App\Models\ServiceResponse;
use App\Models\User;
use Exception;

class UserService
{
    private $serviceResponse;

    public function __construct()
    {
        $this->serviceResponse = new ServiceResponse();
    }

    public function getAll(): ServiceResponse
    {
        try {
            $userList = User::all();
            $this->serviceResponse->setAttributes(200, $userList);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(500, (object)['error' => $exception->getMessage()]);
            return $this->serviceResponse;
        }
    }
}