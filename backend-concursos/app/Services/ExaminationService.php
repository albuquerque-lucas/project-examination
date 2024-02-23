<?php

namespace App\Services;

use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;
use InvalidArgumentException;

class ExaminationService
{
    private $serviceResponse;

    public function __construct()
    {
        $this->serviceResponse = new ServiceResponse();
    }

    public function getAll(string $order): ServiceResponse
    {
        try {
            // Validar o parâmetro de ordenação
            if (!in_array($order, ['asc', 'desc'])) {
                throw new InvalidArgumentException('Parâmetro de ordenação inválido. Use "asc" ou "desc".');
            }

            $query = Examination::query();
            $query->orderBy('id', $order);

            $examinations = $query->paginate();
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $message =  $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro' => $message]);
            return $this->serviceResponse;
        }
    }

    public function getById(int $id, string $order): ServiceResponse
    {

        try {
            if (!in_array($order, ['asc', 'desc'])) {
                throw new InvalidArgumentException('Parâmetro de ordenação inválido. Use "asc" ou "desc".');
            }

            $examination = Examination::query()
                ->where('id', $id)
                ->firstOrFail();
            
            $this->serviceResponse->setAttributes(200, $examination);
            return $this->serviceResponse;
        } catch(Exception $exception)
        {
            $message =  $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro' => $message]);
            return $this->serviceResponse;
        }

    }
}
