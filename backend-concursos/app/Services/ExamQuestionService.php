<?php

namespace App\Services;
use App\Interfaces\IService;
use App\Models\ServiceResponse;
use App\Models\ExamQuestion;
use App\Http\Resources\ExamQuestionResource;
use Exception;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use Nette\Schema\ValidationException;
use PDOException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ExamQuestionService implements IService
{
    private ServiceResponse $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    public function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $examQuestions = ExamQuestion::getAllOrdered($order, $orderBy);

            $collection = ExamQuestionResource::collection($examQuestions);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => $this->serviceResponse->recordsNotFound(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getById(int $id): ServiceResponse
    {
        try {
            $examQuestion = ExamQuestion::getById($id);
            if ($examQuestion === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }
            $resource = new ExamQuestionResource($examQuestion);
            $this->serviceResponse->setAttributes(200, $resource);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => $this->serviceResponse->recordsNotFound(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByTitle(string $title) {
        try {
            $examQuestion = ExamQuestion::query()->where('title', 'like', "%$title%")->first();

            $resource = new ExamQuestionResource($examQuestion);
            $this->serviceResponse->setAttributes(200, $resource);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => $this->serviceResponse->recordsNotFound(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function getByStatement(string $statement = '', string $order = 'desc'): ServiceResponse
    {
        try {
            $examQuestion = ExamQuestion::getByStatement($statement, $order);

            $resource = ExamQuestionResource::collection($examQuestion);
            $this->serviceResponse->setAttributes(200, $resource);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'info' => $this->serviceResponse->recordsNotFound(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function create(array $data): ServiceResponse
    {
        try {
            $examQuestion = ExamQuestion::create($data);

            if (!$examQuestion) {
                $this->serviceResponse->setAttributes(422, (object)[
                    'message' => $this->serviceResponse->failedToCreateRecord()
                ]);
                return $this->serviceResponse;
            }

            $responseData = (object)[
            'message' => 'Questão adicionada com sucesso.',
                'id' => $examQuestion->id,
                'file_name' => $examQuestion->file_name,
                'file_path' => $examQuestion->file,
            ];

            $this->serviceResponse->setAttributes(201, $responseData);
            return $this->serviceResponse;
        } catch (ValidationException $exception) {
            $this->serviceResponse->setAttributes(422, (object)[
                'info' => $this->serviceResponse->validationFailed(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => $this->serviceResponse->failedToCreateRecord(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function update(int $id, array $data, bool $hasFile = false): ServiceResponse 
    {
        try {
            $examQuestion = ExamQuestion::find($id);
            if (!$examQuestion) {
                $examQuestion->serviceResponse->setAttributes(404, (object)[
                    'message' => "Question not found."
                ]);
                return $this->serviceResponse;
            }

            $examQuestion->fill($data);

            $responseModel = (object)[
                'message' => $this->serviceResponse->changesSaved(),
                'id' => $examQuestion->id,
            ];

            if ($examQuestion->isDirty()) {
                $examQuestion->save();
                $this->serviceResponse->setAttributes(200, $responseModel);
            } else {
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => $this->serviceResponse->noChangesToBeMade(),
                    'subject' => $examQuestion
                ]);
            }
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'info' => $this->serviceResponse->failedToCreateRecord(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'info' => $this->serviceResponse->badRequest(),
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    public function delete(int $id): ServiceResponse
    {
        try {
            $examQuestion = ExamQuestion::findOrFail($id);

            if (!$examQuestion) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => 'Questão não encontrada.',
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $isDeleted = $examQuestion->delete();
    
            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => $this->serviceResponse->errorTryingToDelete(),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'mensagem' => 'Questão excluída com sucesso.',
                'deleted' => true,
            ]);

            return $this->serviceResponse;
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound(),
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->badRequest(),
                'deleted' => false,
                'info' => $exception->getMessage(),
            ]);
            return $this->serviceResponse;
        }
    }
}