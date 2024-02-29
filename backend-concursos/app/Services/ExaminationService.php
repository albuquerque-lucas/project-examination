<?php

namespace App\Services;

use App\Exceptions\InvalidDateFormatException;
use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;
use InvalidArgumentException;
use DateTime;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use App\Models\Notice;

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
            $this->serviceResponse->setAttributes(404, (object)['message' => 'Os registros solicitados não foram encontrados.']);
            return $this->serviceResponse;
        }
    }

    public function getById(int $id): ServiceResponse
    {
        try {
            $examination = Examination::query()
                ->where('id', $id)
                ->with(['notice', 'exams'])
                ->firstOrFail();
            $this->serviceResponse->setAttributes(200, $examination);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(404, (object)['message' => 'Não foi encontrado nenhum objeto com este id.']);
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
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)['message' => 'Algo aconteceu. O servico nao pode completar a requisicao.']);
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
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(404, (object)['message' => 'Não foram encontradas instituições com as palavras utilizadas.']);
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
            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(404, (object)['message' => 'A data especificada não pode ser encontrada.']);
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

            if (!$examinations) {
                throw new NotFound('Nao foram encontrados concursos deste nivel de escolaridade.');
            }

            $this->serviceResponse->setAttributes(200, $examinations);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)['message' => $exception->getMessage()]);
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
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(422, (object)['message' => 'Não foi possível criar um novo registro de Examination.']);
            return $this->serviceResponse;
        }
    }
}
