<?php

namespace App\Services;

use App\Http\Resources\TopicResource;
use App\Interfaces\IService;
use App\Models\ServiceResponse;
use Exception;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use Nette\Schema\ValidationException;
use PDOException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Models\Topic;

class TopicService implements IService
{
    private ServiceResponse $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $topics = Topic::getAllOrdered($order, $orderBy);

            $collection = TopicResource::collection($topics);
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
            $topic = Topic::getById($id);
            if ($topic === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }
            $resource = new TopicResource($topic);
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
            $topic = Topic::create($data);

            if (!$topic) {
                $this->serviceResponse->setAttributes(422, (object)[
                    'message' => $this->serviceResponse->failedToCreateRecord()
                ]);
                return $this->serviceResponse;
            }

            $responseData = (object)[
                'message' => $this->serviceResponse->createdSuccessfully('Topic'),
                'id' => $topic->id,
                'title' => $topic->title
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
            $topic = Topic::find($id);
            if (!$topic) {
                $topic->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Topic')
                ]);
                return $this->serviceResponse;
            }

            $topic->fill($data);

            $responseModel = (object)[
                'message' => $this->serviceResponse->changesSaved(),
                'id' => $topic->id,
            ];

            if ($topic->isDirty()) {
                $topic->save();
                $this->serviceResponse->setAttributes(200, $responseModel);
            } else {
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => $this->serviceResponse->noChangesToBeMade(),
                    'topic' => $topic
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
            $topic = Topic::findOrFail($id);

            if (!$topic) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Topic'),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $isDeleted = $topic->delete();
    
            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => $this->serviceResponse->errorTryingToDelete(),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'message' => $this->serviceResponse->deletedSuccessfully('Topic'),
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