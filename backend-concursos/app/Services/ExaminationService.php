<?php

namespace App\Services;

use App\Exceptions\InvalidDateFormatException;
use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;
use InvalidArgumentException;
use DateTime;

class ExaminationService
{
    private $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    public function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {

            $query = Examination::query();
            $query->orderBy($orderBy, $order);

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

    public function getByRegistrationDate(string $registrationDate, string $order, string $position): ServiceResponse
    {
        try {
            $parsedDate = DateTime::createFromFormat('Y-m-d', $registrationDate);
            if (!$parsedDate) {
                throw new InvalidDateFormatException('Data inválida. Use o formato Y-m-d.');
            }
            $query = Examination::query();
            $query->orderBy('id', $order)
                ->where("registration_{$position}_date", $parsedDate->format('Y-m-d'));
    
            $examinations = $query->paginate();
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $message = $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro em Service' => $message]);
            return $this->serviceResponse;
        }
    }

    public function create(array $data): ServiceResponse
    {
        try {
            $examination = Examination::create($data);
            if(!$examination) {
                $this->serviceResponse->setAttributes(500, (object)[
                    'message' => 'Erro ao criar um novo concurso.'
                ]);
                return $this->serviceResponse;
            }
            
            $this->serviceResponse->setAttributes(201, $examination);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $message = $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro em Server' => $message]);
            return $this->serviceResponse;
        }
    }
}
