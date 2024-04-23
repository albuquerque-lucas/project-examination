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
    public function getAll(string $order, string $orderBy = 'id', array $params = []): ServiceResponse
    {
        try {
            $studyAreas = StudyArea::getAllOrdered($order, $orderBy, $params);
            $this->serviceResponse->setAttributes(200, $studyAreas);
            $collection = StudyAreaResource::collection($studyAreas);
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

    public function getByArea(string $area, string $order): ServiceResponse
    {
        try {
            $studyAreas = StudyArea::getByArea($area, $order);

            $this->serviceResponse->setAttributes(200, $studyAreas);
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
    public function create(array $data): ServiceResponse
    {
        try {
            $studyArea = StudyArea::create($data);

            if (!$studyArea) {
                $this->serviceResponse->setAttributes(422, (object)[
                    'message' => $this->serviceResponse->failedToCreateRecord(),
                ]);
                return $this->serviceResponse;
            }

            $responseData = (object)[
                'message' => $this->serviceResponse->createdSuccessfully('Study area'),
                'id' => $studyArea->id,
                'area' => $studyArea->area,
            ];

            $this->serviceResponse->setAttributes(201, $responseData);
            return $this->serviceResponse;
        } catch (ValidationException $exception) {
            $this->serviceResponse->setAttributes(422, (object)[
                'message' => $this->serviceResponse->validationFailed(),
                'info' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'message' => $this->serviceResponse->failedToCreateRecord(),
                'info' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->badRequest(),
                'info' => $exception->getMessage(),
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
                    'message' => $this->serviceResponse->recordsNotFound(),
                ]);
                return $this->serviceResponse;
            }

            $studyArea->fill($data);

            $responseModel = (object)[
                'message' => $this->serviceResponse->changesSaved(),
                'id' => $studyArea->id,
            ];

            if ($studyArea->isDirty()) {
                $studyArea->save();
                $this->serviceResponse->setAttributes(200, $responseModel);
            } else {
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => $this->serviceResponse->noChangesToBeMade(),
                    'study_area' => $studyArea
                ]);
            }
            return $this->serviceResponse;
        } catch (PDOException $exception) {
            $this->serviceResponse->setAttributes(409, (object)[
                'message' => $this->serviceResponse->failedToUpdateRecord(),
                'info' => $exception->getMessage(),
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
            $studyArea = StudyArea::findOrFail($id);

            if (!$studyArea) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound(),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }

            $isDeleted = $studyArea->delete();

            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => $this->serviceResponse->errorTryingToDelete(),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'message' => $this->serviceResponse->deletedSuccessfully('Area'),
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