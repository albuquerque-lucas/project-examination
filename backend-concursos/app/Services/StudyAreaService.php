<?php

namespace App\Services;

use App\Http\Resources\StudyAreaResource;
use App\Models\ServiceResponse;
use App\Interfaces\IService;
use App\Models\StudyArea;
use Exception;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use PDOException;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class StudyAreaService implements IService
{

    protected ServiceResponse $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }
    public function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $studyAreas = StudyArea::getAllOrdered($order, $orderBy);

            $decoded = $studyAreas->toArray();
            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };

            $collection = StudyAreaResource::collection($studyAreas);
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
            $studyArea = StudyArea::getById($id);
            if ($studyArea === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }

            $resource = new StudyAreaResource($studyArea);
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
                'info' => 'Não foi possível concluir a solicitação.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByArea(string $area, string $order): ServiceResponse
    {
        try {
            $studyAreas = StudyArea::getByArea($area, $order);
            $decoded = $studyAreas->toArray();

            if (empty($decoded['data'])) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            };

            $this->serviceResponse->setAttributes(200, $studyAreas);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'Ocorreu um erro inesperado.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function create(array $data): ServiceResponse
    {
        try {
            $studyArea = StudyArea::create($data);

            if (!$studyArea) {
                $this->serviceResponse->setAttributes(422, (object)[
                    'message' => 'Nao foi possivel processar a requisicao.'
                ]);
                return $this->serviceResponse;
            }

            $responseData = (object)[
                'message' => 'Área de estudo adicionada com sucesso.',
                'id' => $studyArea->id,
                'area' => $studyArea->area,
            ];

            $this->serviceResponse->setAttributes(201, $responseData);
            return $this->serviceResponse;
        } catch (ValidationException $exception) {
            $this->serviceResponse->setAttributes(422, (object)[
                'info' => 'Validação falhou. Verifique os erros.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => 'Não foi possível criar o registro. Verifique os dados informados.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'Ocorreu um erro inesperado.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function update(int $id, array $data, bool $hasFile): ServiceResponse
    {
        try {
            $studyArea = StudyArea::find($id);
            if (!$studyArea) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => "Não foi encontrada nenhuma área com este id: $id"
                ]);
                return $this->serviceResponse;
            }

            $studyArea->fill($data);

            $responseModel = (object)[
                'message' => 'Alteração feita com sucesso.',
                'id' => $studyArea->id,
            ];

            if ($studyArea->isDirty()) {
                $studyArea->save();
                $this->serviceResponse->setAttributes(200, $responseModel);
            } else {
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => 'Nenhuma alteração a ser feita.',
                    'study_area' => $studyArea
                ]);
            }
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => 'Não foi possível criar o registro. Verifique os dados informados.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => 'Ocorreu um erro inesperado.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function delete(int $id): ServiceResponse
    {
        try {
            $studyArea = StudyArea::findOrFail($id);

            if (!$studyArea) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => 'Area nao encontrada.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }

            $isDeleted = $studyArea->delete();

            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => 'Erro ao tentar deletar o registro.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'mensagem' => 'Area excluida com sucesso.',
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
}