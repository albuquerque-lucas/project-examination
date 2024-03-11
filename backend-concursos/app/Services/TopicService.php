<?php

namespace App\Services;
use App\Interfaces\IService;
use App\Models\ServiceResponse;

class TopicService implements IService
{
    function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
    
    }

    function getById(int $id)
    {

    }


    function create(array $data): ServiceResponse
    {

    }

    
    function update(int $id, array $data, bool $hasFile): ServiceResponse
    {

    }

    function delete(int $id): ServiceResponse
    {

    }
}