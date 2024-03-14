<?php

namespace App\Services;

use App\Interfaces\IService;
use App\Models\ServiceResponse;
use App\Models\EducationalLevel;
use App\Http\Resources\EducationalLevelResource;
use Exception;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use Nette\Schema\ValidationException;
use PDOException;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class EducationalLevelService implements IService
{
    private ServiceResponse $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $educationalLevels = EducationalLevel::getAllOrdered($order, $orderBy);

            $collection = EducationalLevelResource::collection($educationalLevels);
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

    function getById(int $id)
    {
        try {
            $educationalLevel = EducationalLevel::getById($id);
            if ($educationalLevel === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }
            $resource = new EducationalLevelResource($educationalLevel);
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

    public function getByName(string $name, string $order = 'desc') {
        try {
            $educationalLevels = EducationalLevel::getByName($name, $order);

            $resource = EducationalLevelResource::collection($educationalLevels);

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

    function create(array $data): ServiceResponse
    {
        try {
            $educationalLevel = EducationalLevel::create($data);

            if (!$educationalLevel) {
                $this->serviceResponse->setAttributes(422, (object)[
                    'message' => $this->serviceResponse->failedToCreateRecord()
                ]);
                return $this->serviceResponse;
            }

            $responseData = (object)[
                'message' => $this->serviceResponse->createdSuccessfully('Educational level'),
                'id' => $educationalLevel->id,
                'title' => $educationalLevel->title
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

    
    function update(int $id, array $data, bool $hasFile): ServiceResponse
    {
        try {
            $educationalLevel = EducationalLevel::find($id);
            if (!$educationalLevel) {
                $educationalLevel->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Educational level'),
                ]);
                return $this->serviceResponse;
            }

            $educationalLevel->fill($data);

            $responseModel = (object)[
                'message' => $this->serviceResponse->changesSaved(),
                'id' => $educationalLevel->id,
            ];

            if ($educationalLevel->isDirty()) {
                $educationalLevel->save();
                $this->serviceResponse->setAttributes(200, $responseModel);
            } else {
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => $this->serviceResponse->noChangesToBeMade(),
                    'topic' => $educationalLevel
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

    function delete(int $id): ServiceResponse
    {
        try {
            $educationalLevel = EducationalLevel::findOrFail($id);

            if (!$educationalLevel) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Educational level'),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $isDeleted = $educationalLevel->delete();
    
            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => $this->serviceResponse->errorTryingToDelete(),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'message' => $this->serviceResponse->deletedSuccessfully('Educational level'),
                'deleted' => true,
            ]);

            return $this->serviceResponse;
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound('Educational level'),
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->errorTryingToDelete(),
                'deleted' => false,
                'info' => $exception->getMessage(),
            ]);
            return $this->serviceResponse;
        }
    }
}