<?php

namespace App\Services;
use App\Http\Resources\ExamResource;
use App\Interfaces\IService;
use App\Models\ServiceResponse;
use Exception;
use PDOException;
use Nette\Schema\ValidationException;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Storage;
use App\Models\Exam;
use Carbon\Carbon;

class ExamService
{
    private ServiceResponse $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }
    
    function getAll(string $order, string $orderBy = 'id'): ServiceResponse
    {
        try {
            $exams = Exam::getAllOrdered($order, $orderBy);

            $collection = ExamResource::collection($exams);
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound('Exam'),
                'info' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->badRequest(),
                'info' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    function getById(int $id)
    {
        try {
            $exam = Exam::getById($id);
            if ($exam === null) {
                $this->serviceResponse->setAttributes(204, (object)['code' => 204]);
                return $this->serviceResponse;
            }

            $resource = new ExamResource($exam);
            $this->serviceResponse->setAttributes(200, $resource);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound('Exam'),
                'info' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->badRequest(),
                'info' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }
    function create(array $data): ServiceResponse
    {
        try {
            $exam = Exam::create($data);

            if (!$exam) {
                $this->serviceResponse->setAttributes(422, (object)[
                    'message' => $this->serviceResponse->failedToCreateRecord()
                ]);
                return $this->serviceResponse;
            }

            $responseData = (object)[
                'message' => $this->serviceResponse->createdSuccessfully(),
                'id' => $exam->id,
                'title' => $exam->title,
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
    
    function update(int $id, array $data, bool $hasFile)
    {
        try {
            $foreignRelationshipChanged = false;
            $exam = Exam::find($id);
            if (!$exam) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Exam'),
                ]);
                return $this->serviceResponse;
            }
    
            if ($hasFile && Storage::disk('public')->exists($exam->notice()->file_name)) {
                Storage::disk('public')->delete($exam->notice()->file_name);
            }
    
            if (isset($data['subject_id'])) {
                $exam->subjects()->attach($data['subject_id']);
                unset($data['subject_id']);
                $foreignRelationshipChanged = true;
            }

            if (isset($data['date'])) {
                $data['date'] = Carbon::createFromFormat('Y-m-d', $data['date'])->format('Y-m-d');
            }
    
            $exam->fill($data);
    
            $responseModel = (object)[
                'message' => $this->serviceResponse->changesSaved(),
                'id' => $exam->id,
                'exam' => ExamResource::make($exam),
            ];
    
            if ($exam->isDirty() || $foreignRelationshipChanged) {
                $exam->save();
                $this->serviceResponse->setAttributes(200, $responseModel);
            } else {
                $this->serviceResponse->setAttributes(200, (object)[
                    'message' => $this->serviceResponse->noChangesToBeMade(),
                    'exam' => ExamResource::make($exam)
                ]);
            }
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
    

    function delete(int $id): ServiceResponse
    {
        try {
            $exam = Exam::findOrFail($id);

            if (!$exam) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Exam'),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $isDeleted = $exam->delete();
    
            if (!$isDeleted) {
                $this->serviceResponse->setAttributes(400, (object)[
                    'message' => $this->serviceResponse->errorTryingToDelete(),
                    'deleted' => false,
                ]);
                return $this->serviceResponse;
            }
    
            $this->serviceResponse->setAttributes(200, (object)[
                'message' => $this->serviceResponse->deletedSuccessfully('Exam'),
                'deleted' => true,
            ]);

            return $this->serviceResponse;
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound('Exam'),
                'info' => $exception->getMessage(),
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        } catch(Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => $this->serviceResponse->badRequest(),
                'info' => $exception->getMessage(),
                'deleted' => false,
            ]);
            return $this->serviceResponse;
        }
    }

    public function detachSubject(int $examId, int $subjectId): ServiceResponse
{
    try {
        $exam = Exam::find($examId);
        if (!$exam) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound('Exam'),
            ]);
            return $this->serviceResponse;
        }

        $subjectDetached = $exam->subjects()->detach($subjectId);

        if ($subjectDetached) {
            $this->serviceResponse->setAttributes(200, (object)[
                'message' => $this->serviceResponse->changesSaved(),
                'exam' => new ExamResource($exam),
            ]);
        } else {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'Failed to detach subject from exam',
            ]);
        }
        
        return $this->serviceResponse;
    } catch (ModelNotFoundException $exception) {
        $this->serviceResponse->setAttributes(404, (object)[
            'message' => $this->serviceResponse->recordsNotFound('Exam'),
            'info' => $exception->getMessage(),
        ]);
        return $this->serviceResponse;
    } catch (Exception $exception) {
        $this->serviceResponse->setAttributes(400, (object)[
            'message' => $this->serviceResponse->badRequest(),
            'info' => $exception->getMessage(),
        ]);
        return $this->serviceResponse;
    }
}

}