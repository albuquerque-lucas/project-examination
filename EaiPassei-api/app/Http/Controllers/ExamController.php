<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamFormRequest;
use App\Services\DataRetrievalService;
use App\Services\ExamQuestionAlternativeService;
use App\Services\ExamQuestionService;
use App\Services\ExamService;
use Illuminate\Http\Request;
use Exception;
use Error;

class ExamController extends Controller
{
    protected ExamService $examService;

    protected ExamQuestionService $examQuestionService;

    protected ExamQuestionAlternativeService $examQuestionAlternativeService;

    private DataRetrievalService $dataRetrievalService;

    public function __construct(
        ExamService $examService,
        ExamQuestionService $examQuestionService,
        ExamQuestionAlternativeService $examQuestionAlternativeService,
        DataRetrievalService $dataRetrievalService
        )
    {
        $this->examService = $examService;
        $this->examQuestionService = $examQuestionService;
        $this->examQuestionAlternativeService = $examQuestionAlternativeService;
        $this->dataRetrievalService = $dataRetrievalService;

        $this->middleware('auth:sanctum', ['except' => ['getAll', 'getById']]);
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->examService, $request);
    }

    public function getById(int $id)
    {
        try {
            $response = $this->examService->getById($id);
    
            return response()->json($response->data(), $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'error' => 'An unexpected error occurred.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 500);
        }
    }

    public function update(Request $request)
    {
        try {
            $data = $request->all();
            $id = $data['id'];
            unset($data['id']);
            $hasFile = false;
            if ($request->hasFile('exam_image')) {
                $noticePath = '';
                $data['exam_image'] = $noticePath;
                $hasFile = true;
            }

            $response = $this->examService->update($id, $data, $hasFile);
    
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function delete(int $id)
    {
        try {
            $response = $this->examService->delete($id);
            return response()->json($response->data(), $response->status());

        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function create(ExamFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->examService, $request);
    }

    public function createFull(Request $request)
    {
        $validated = $request->validate([
            'examination_id' => 'required|integer',
            'title' => 'required|string',
            'questions' => 'required|integer',
            'alternatives' => 'required|integer'
        ]);

        $examQuery = [
            'examination_id' => $validated['examination_id'],
            'title' => $validated['title']
        ];

        $examServiceResponse = $this->examService->create($examQuery);
        $examServiceData = $examServiceResponse->data();
        $examId = $examServiceData->id;

        $questionServiceResponse = $this->examQuestionService->createMany($examId, $validated['questions']);
        $questionsData = $questionServiceResponse->data();
        $questionsIds = $questionsData->ids;

        $alternativeServiceResponse = $this->examQuestionAlternativeService->createMany($questionsIds, $validated['alternatives']);
        $alternativesData = $alternativeServiceResponse->data();
        $alternativesIds = $alternativesData->ids;
        
        return response()->json([
            'message' => 'Prova, questões e alternativas criadas com sucesso.',
            'exam' => $examId,
            'questions' => $questionsIds,
            'alternatives' => $alternativesIds,
        ], 200);
    }

    public function detachSubject(Request $request, int $examId, int $subjectId)
    {
        try {
            $response = $this->examService->detachSubject($examId, $subjectId);
            return response()->json($response->data(), $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'error' => 'An unexpected error occurred.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 500);
        }
    }
}
