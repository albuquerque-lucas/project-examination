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
        return $this->executeSearch(null, $order);
    }

    public function getById(int $id): ServiceResponse
    {
        return $this->executeSearch(['id' => $id], null);
    }

    public function getByTitle(string $title, string $order): ServiceResponse
    {
        return $this->executeSearch(['title' => "%{$title}%"], $order, 'like');
    }

    public function getByInstitution(string $institution, string $order): ServiceResponse
    {
        return $this->executeSearch(['institution' => "%{$institution}%"], $order, 'like');
    }

    public function getByExamDate(string $examDate, string $order): ServiceResponse
    {
        $parsedDate = DateTime::createFromFormat('Y-m-d', $examDate);
        if (!$parsedDate) {
            throw new InvalidArgumentException('Data inválida. Use o formato YYYY-MM-DD.');
        }

        return $this->executeSearch(['exam_date' => $parsedDate->format('Y-m-d')], $order);
    }

    private function executeSearch(array $conditions = null, string $order = null, string $searchType = '='): ServiceResponse
    {
        try {
            // $startTime = microtime(true);

            if ($order && !in_array($order, ['asc', 'desc'])) {
                throw new InvalidArgumentException('Parâmetro de ordenação inválido. Use "asc" ou "desc".');
            }

            $query = Examination::query();

            if ($conditions) {
                foreach ($conditions as $field => $value) {
                    if ($searchType === 'like') {
                        $query->where($field, $searchType, $value);
                    } else {
                        $query->where($field, $value);
                    }
                }
            }

            if ($order) {
                $query->orderBy('id', $order);
            }

            $examinations = $query->paginate();

            // $endTime = microtime(true);
            // $executionTime = $endTime - $startTime;
        
            // echo "Tempo de execução: {$executionTime} segundos";

            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $message = $exception->getMessage();
            $this->serviceResponse->setAttributes(500, (object)['Ocorreu um erro' => $message]);
            return $this->serviceResponse;
        }
    }
}
