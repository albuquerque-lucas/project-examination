<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamQuestionFormRequest;
use App\Http\Requests\QuestionsSearchFormRequest;
use App\Services\DataRetrievalService;
use App\Services\ExamQuestionService;
use Illuminate\Http\Request;
use Exception;
use Error;

class ExamQuestionController extends Controller
{
    protected ExamQuestionService $examQuestionService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(ExamQuestionService $examQuestionService, DataRetrievalService $dataRetrievalService)
    {
        $this->examQuestionService = $examQuestionService;
        $this->dataRetrievalService = $dataRetrievalService;

        $this->middleware('auth:sanctum', ['except' => ['getAll', 'getById', 'getByStatement']]);
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->examQuestionService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->examQuestionService, $id);
    }

    public function getByStatement(QuestionsSearchFormRequest $request)
    {
        try {
            $request->validate([
                'statement' => 'required|string',
                'order' => 'string|in:asc,desc',
            ]);
            $statement = $request->input('statement');
            $order = $request->input('order', 'desc');
            $response = $this->examQuestionService->getByStatement($statement, $order);
            $data = $response->data();
            $dataArray = (array)$data;

            return response()->json($dataArray['resource'], $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'error' => 'An unexpected error occurred.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 500);
        }
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->examQuestionService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->examQuestionService, $id);
    }

    public function create(ExamQuestionFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->examQuestionService, $request);
    }
}
