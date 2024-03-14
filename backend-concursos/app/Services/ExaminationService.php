<?php

namespace App\Services;

use App\Exceptions\InvalidDateFormatException;
use App\Http\Resources\ExaminationResource;
use App\Models\Examination;
use App\Models\ServiceResponse;
use Exception;
use DateTime;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use Nette\Schema\ValidationException;
use PDOException;
use Storage;
use App\Interfaces\IService;

class ExaminationService implements IService
{
    private $serviceResponse;

    private Examination $model;

    public function __construct(ServiceResponse $serviceResponse, Examination $model)
    {
        $this->serviceResponse = $serviceResponse;
        $this->model = $model;
    }

    public function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $examinations = Examination::getAllOrdered($order, $orderBy);

            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => 'Nao foram encontrados registros.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'Nao foi possivel concluir a solicitacao.',
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

            $resource = new ExaminationResource($examination);
            $this->serviceResponse->setAttributes(200, $resource);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => 'Nao foram encontrados registros.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'Nao foi possivel concluir a solicitacao.',
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

            $collection = ExaminationResource::collection($examinations);

            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
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

            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);

            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
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
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
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
            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
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


            $collection = ExaminationResource::collection($examinations);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch (NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
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
                'info' => 'Error validation failed. Please check errors.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => 'Failed to create record. Please check the submitted data.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function update(int $id, array $data, bool $hasFile): ServiceResponse
    {
        try {
            $examination = Examination::find($id);
            if (!$examination) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => "Não foi encontrado nenhum concurso com este id: $id"
                ]);
                return $this->serviceResponse;
            }

            if ($hasFile && Storage::disk('public')->exists($examination->notice()->file_name)) {
                dd("Parando aplicação antes de deletar do Storage");
                Storage::disk('public')->delete($examination->notice()->file_name);
            }

            $examination->fill($data);

            $responseModel = (object)[
                'message' => 'Alteração feita com sucesso.',
                'id' => $examination->id,
            ];

            if ($examination->isDirty()) {
                $examination->save();
                $this->serviceResponse->setAttributes(200, $responseModel);
            } else {
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => 'No changes to apply',
                    'examination' => $examination
                ]);
            }

            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => 'Failed to create record. Please check the submitted data.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'An unexpected error occurred.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function delete(int $id): ServiceResponse
    {
        try {
            $examination = Examination::findOrFail($id);

            if (!$examination) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => 'Concurso nao encontrado.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }

            $isDeleted = $examination->delete();

            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => 'Erro ao tentar deletar o registro.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }

            $this->serviceResponse->setAttributes(200, (object)[
                'mensagem' => 'Concurso excluido com sucesso.',
                'deleted' => true,
            ]);
            return $this->serviceResponse;
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => 'Nao foi encontrado nenhum registro com os dados fornecidos.',
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'Ocorreu um erro ao tentar alterar o registro.',
                'deleted' => false,
                'info' => $exception->getMessage(),
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
