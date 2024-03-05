<?php

namespace App\Services;

use App\Exceptions\InvalidDateFormatException;
use App\Http\Resources\ExaminationResource;
use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;
use DateTime;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use Nette\Schema\ValidationException;
use PDOException;
use Log;
use Error;

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
            $examinations = Examination::getAllOrdered($order, $orderBy);
            // dd($examinations);
            $decoded = $examinations->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };
            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    
    public function getById(int $id): ServiceResponse
    {
        try {
            $examination = Examination::getById($id);
            if ($examination === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }

            $this->serviceResponse->setAttributes(200, $examination);

            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByTitle(string $title, string $order): ServiceResponse
    {
        try {
            $examinations = Examination::getByTitle($title, $order);


            $decoded = $examinations->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };
            $collection = ExaminationResource::collection($examinations);

            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function getByInstitution(string $institution, string $order): ServiceResponse
    {
        try {
            $examinations = Examination::getByInstitution($institution, $order);

            $decoded = $examinations->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };

            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);

            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByRegistrationDate(DateTime $registrationDate, string $order, string $position): ServiceResponse
    {
        try {
            $examinations = Examination::getByRegistrationDate($registrationDate, $order, $position);
            $decoded = $examinations->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };
            $collection = ExaminationResource::collection($examinations);

            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch (InvalidDateFormatException $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByEducationalLevel(int $educationalLevelId, string $order): ServiceResponse
    {
        try {
            $examinations = Examination::getByEducationalLevel($educationalLevelId, $order);
            $decoded = $examinations->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };
            
            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByActivityStatus(bool $active, string $order): ServiceResponse
    {
        try {
            $examinations = Examination::getByActivityStatus($active, $order);
            $decoded = $examinations->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };

            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch (NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function create(array $data): ServiceResponse
    {
        try {
            $examination = Examination::create($data);

            if(!$examination) {
                throw new Exception('Não foi possível criar um novo registro de Examination.');
            }

            $responseData = (object)[
                'message' => 'Concurso adicionado com sucesso.',
                'id' => $examination->id,
                'title' => $examination->title,
                'institution' => $examination->institution,
            ];
            
            $this->serviceResponse->setAttributes(201, $responseData);
            return $this->serviceResponse;
        } catch (ValidationException $exception) {
            $this->serviceResponse->setAttributes(422, (object)[
                'message' => 'Validação falhou. Verifique os erros.',
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'message' => 'Não foi possível criar o registro. Verifique os dados informados.',
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    private function validateDateFormat($date)
    {
        $parsedDate = DateTime::createFromFormat('Y-m-d', $date);
        if (!$parsedDate) {
            throw new InvalidDateFormatException('Data inválida. Use o formato YYYY-MM-DD. Service', 400);
        }

        return $parsedDate;
    }
}
