<?php

namespace App\Services;

use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;
use InvalidArgumentException;
use DateTime;

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

    public function getById(int $id): ServiceResponse
    {
        try {
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

    public function getByTitle(string $title, string $order): ServiceResponse
    {
        try {
            if (!in_array($order, ['asc', 'desc'])) {
                throw new InvalidArgumentException('Parâmetro de ordenação inválido. Use "asc" ou "desc".');
            }

            $query = Examination::query();
            $query->orderBy('id', $order)
                ->where('title', 'like', "%{$title}%");

            $examinations = $query->paginate();
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $message =  $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro' => $message]);
            return $this->serviceResponse;
        }
    }

    public function getByInstitution(string $institution, string $order): ServiceResponse
    {
        try {
            if (!in_array($order, ['asc', 'desc'])) {
                throw new InvalidArgumentException('Parâmetro de ordenação inválido. Use "asc" ou "desc".');
            }

            $query = Examination::query();
            $query->orderBy('id', $order)
                ->where('institution', 'like', "%{$institution}%");

            $examinations = $query->paginate();
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $message =  $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro' => $message]);
            return $this->serviceResponse;
        }
    }

    public function getByExamDate(string $examDate, string $order): ServiceResponse
    {
        try {
            if (!in_array($order, ['asc', 'desc'])) {
                throw new InvalidArgumentException('Parâmetro de ordenação inválido. Use "asc" ou "desc".');
            }
    
            $parsedDate = DateTime::createFromFormat('Y-m-d', $examDate);
            if (!$parsedDate) {
                throw new InvalidArgumentException('Data inválida. Use o formato YYYY-MM-DD.');
            }
    
            $query = Examination::query();
            $query->orderBy('id', $order)
                ->whereDate('exam_date', $parsedDate->format('Y-m-d'));
    
            $examinations = $query->paginate();
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $message = $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro' => $message]);
            return $this->serviceResponse;
        }
    }
}
