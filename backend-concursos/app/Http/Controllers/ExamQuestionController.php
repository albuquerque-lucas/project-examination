<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamQuestionFormRequest;
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
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->examQuestionService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->examQuestionService, $id);
    }

    public function getByTitle(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string',
            ]);
            $title = $validated['title'];
            $response = $this->examQuestionService->getByTitle($title);
            return response()->json($response->data(), $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'error' => 'Ocorreu um erro inesperado.',
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
