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
use Illuminate\Support\Facades\DB;
use App\Models\ExamQuestionAlternative;

class ExamQuestionService implements IService
{
    private ServiceResponse $serviceResponse;

    public function __construct(ServiceResponse $serviceResponse)
    {
        $this->serviceResponse = $serviceResponse;
    }

    public function getAll(string $order, string $orderBy = 'id', array $params = []): ServiceResponse
    {
        try {
            $examQuestions = ExamQuestion::getAllOrdered($order, $orderBy, $params);
            
            $collection = ExamQuestionResource::collection($examQuestions);
            // $this->serviceResponse->setAttributes(200, (object)[
            //     'params' => $params,
            //     'questions' => $examQuestions,
            //     'collection' => $collection,
            // ]);
            // return $this->serviceResponse;
            $this->serviceResponse->setAttributes(200, $collection);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound(),
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
                'message' => $this->serviceResponse->recordsNotFound(),
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

    public function getByTitle(string $title) {
        try {
            $examQuestion = ExamQuestion::query()->where('title', 'like', "%$title%")->first();

            $resource = new ExamQuestionResource($examQuestion);
            $this->serviceResponse->setAttributes(200, $resource);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound(),
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

    public function getByStatement(string $statement = '', string $order = 'desc'): ServiceResponse
    {
        try {
            $examQuestion = ExamQuestion::getByStatement($statement, $order);

            $resource = ExamQuestionResource::collection($examQuestion);
            $this->serviceResponse->setAttributes(200, $resource);
            return $this->serviceResponse;
        } catch(NotFound $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound(),
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

    public function create(array $examQuestions): ServiceResponse
    {
        try {
            $createdExamQuestionsIds = [];
    
            DB::transaction(function () use ($examQuestions, &$createdExamQuestionsIds) {
                foreach ($examQuestions as $examQuestion) {
                    $createdExamQuestion = ExamQuestion::create($examQuestion);
    
                    if (!$createdExamQuestion) {
                        throw new Exception('Failed to create exam question');
                    }
    
                    $createdExamQuestionsIds[] = $createdExamQuestion->id;
                }
            });
    
            $responseData = (object)[
                'message' => $this->serviceResponse->createdManySuccessfully(),
                'count' => count($examQuestions),
                'ids' => $createdExamQuestionsIds,
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

    public function update(int $id, array $data, bool $hasFile = false): ServiceResponse 
    {
        try {
            $examQuestion = ExamQuestion::find($id);
            if (!$examQuestion) {
                $examQuestion->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Question')
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
    public function delete(int $id): ServiceResponse
    {
        try {
            $examQuestion = ExamQuestion::findOrFail($id);

            if (!$examQuestion) {
                $this->serviceResponse->setAttributes(404, (object)[
                    'message' => $this->serviceResponse->recordsNotFound('Question'),
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
                'message' => $this->serviceResponse->deletedSuccessfully('Question'),
                'deleted' => true,
            ]);

            return $this->serviceResponse;
        } catch (ModelNotFoundException $exception) {
            $this->serviceResponse->setAttributes(404, (object)[
                'message' => $this->serviceResponse->recordsNotFound(),
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

    public function createMany(int $examId, int $numberOfQuestions) {
        try {
            $questionsIds = [];
            DB::transaction(function () use ($examId, $numberOfQuestions, &$questionsIds) {
                for ($i = 0; $i < $numberOfQuestions; $i++) {
                    $examQuestion = ExamQuestion::create([
                        'exam_id' => $examId,
                        'question_number' => $i + 1,
                    ]);
                    $questionsIds[] = $examQuestion->id;
                }
            });
    
            $this->serviceResponse->setAttributes(201, (object)[
                'message' => 'As questões foram criadas com sucesso.',
                'ids' => $questionsIds
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'Ocorreu um erro ao tentar criar as questões no Service.',
                'info' => $exception->getMessage(),
                'code' => $exception->getCode()
            ]);
            return $this->serviceResponse;
        }
    }

    public function createQuestion(array $validated): ServiceResponse
    {
        try {
            DB::transaction(function () use ($validated) {
                // Recupera a última ExamQuestion criada
                $lastExamQuestion = ExamQuestion::orderBy('id', 'desc')->first();
                $lastQuestionNumber = $lastExamQuestion ? $lastExamQuestion->question_number : 0;

                // Cria a nova ExamQuestion
                $examQuestion = ExamQuestion::create([
                    'exam_id' => $validated['exam_id'],
                    'question_number' => $lastQuestionNumber + 1,
                ]);

                // Cria as alternativas
                $letters = range('a', 'z');
                for ($i = 0; $i < $validated['alternativesNumber']; $i++) {
                    ExamQuestionAlternative::create([
                        'exam_question_id' => $examQuestion->id,
                        'letter' => $letters[$i],
                    ]);
                }

                $this->serviceResponse->setAttributes(201, (object)[
                    'message' => 'Exam question created successfully.',
                    'id' => $examQuestion->id,
                ]);
            });

            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'An error occurred while creating the exam question.',
                'info' => $exception->getMessage(),
                'code' => $exception->getCode(),
            ]);
            return $this->serviceResponse;
        }
    }

    public function organize(int $examId)
    {
        try {
            // Organiza as questões por número da questão
            $examQuestions = ExamQuestion::where('exam_id', $examId)->orderBy('question_number')->get();
            $order = 1;
            foreach ($examQuestions as $examQuestion) {
                $examQuestion->question_number = $order;
                $examQuestion->save();
                $order++;
            }
    
            // Organiza as alternativas de cada questão alfabeticamente
            foreach ($examQuestions as $examQuestion) {
                $alternatives = ExamQuestionAlternative::where('exam_question_id', $examQuestion->id)
                    ->orderBy('letter')
                    ->get();
                $letterIndex = 0;
                $letters = range('a', 'z');
                foreach ($alternatives as $alternative) {
                    $alternative->letter = $letters[$letterIndex];
                    $alternative->save();
                    $letterIndex++;
                }
            }

            $questions = ExamQuestion::where('exam_id', $examId)->orderBy('question_number')->get();
            $collection = ExamQuestionResource::collection($questions);
    
            $this->serviceResponse->setAttributes(200, (object)[
                'message' => 'Questions and alternatives organized successfully.',
                'questions' => $collection,
            ]);
            return $this->serviceResponse;
        } catch (Exception $exception) {
            $this->serviceResponse->setAttributes(400, (object)[
                'message' => 'An error occurred while trying to organize the questions and alternatives.',
                'info' => $exception->getMessage(),
                'code' => $exception->getCode(),
            ]);
            return $this->serviceResponse;
        }
    }
    
}