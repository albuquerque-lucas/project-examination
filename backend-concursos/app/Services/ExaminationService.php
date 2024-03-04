<?php

namespace App\Services;

use App\Exceptions\InvalidDateFormatException;
use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;
use DateTime;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use Nette\Schema\ValidationException;
use PDOException;
use Log;

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
            $query->orderBy($orderBy, $order)
            ->with('notice', 'exams');
            
            
            $examinations = $query->paginate();
            $this->checkToThrowNotFound($examinations);

            $this->serviceResponse->setAttributes(200, $examinations);
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
            $examination = Examination::query()
            ->where('id', $id)->firstOrFail();
            $decodedExamination = json_decode($examination);
            
            if ($decodedExamination === null) {
                throw new NotFound("Não foram encontrados registros com os dados fornecidos.", 404);
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
            $query = Examination::query();
            $query->orderBy('id', $order)
                ->where('title', 'like', "%{$title}%");

            $examinations = $query->paginate();

            $this->checkToThrowNotFound($examinations);

            $this->serviceResponse->setAttributes(200, $examinations);
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
            $query = Examination::query();
            $query->orderBy('id', $order)
            ->where('institution', 'like', "%{$institution}%");
            $examinations = $query->paginate();

            $this->checkToThrowNotFound($examinations);

            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByRegistrationDate(string $registrationDate, string $order, string $position): ServiceResponse
    {
        try {
            $parsedDate = DateTime::createFromFormat('Y-m-d', $registrationDate);
            if (!$parsedDate) {
                throw new InvalidDateFormatException('Data inválida. Use o formato YYYY-MM-DD. Service', 400);
            }
            $query = Examination::query();
            $query->orderBy('id', $order)
                ->where("registration_{$position}_date", $parsedDate->format('Y-m-d'));
    
            $examinations = $query->paginate();

            $this->checkToThrowNotFound($examinations);

            $this->serviceResponse->setAttributes(200, $examinations);
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
            $query = Examination::query();
            $query->orderBy('id', $order)
                ->where('educational_level_id', $educationalLevelId);

            $examinations = $query->paginate();

            $this->checkToThrowNotFound($examinations);

            $this->serviceResponse->setAttributes(200, $examinations);
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
            $query = Examination::query();
            $query->orderBy('id', $order)
                ->where('active', $active);

            $list = $query->paginate();

            $this->checkToThrowNotFound($list);

            $this->serviceResponse->setAttributes(200, $list);
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

    private function checkToThrowNotFound($item) {
        if ($item->isEmpty()) {
            throw new NotFound('Não foram encontrados registros com os dados fornecidos.', 404);
        }
    }
}
