<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamQuestionAlternativeRequest;
use Illuminate\Http\Request;
use App\Services\ExamQuestionAlternativeService;
use App\Services\DataRetrievalService;
use Exception;

class ExamQuestionAlternativeController extends Controller
{
    protected ExamQuestionAlternativeService $examQuestionAlternativeService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(ExamQuestionAlternativeService $examQuestionAlternativeService, DataRetrievalService $dataRetrievalService)
    {
        $this->examQuestionAlternativeService = $examQuestionAlternativeService;
        $this->dataRetrievalService = $dataRetrievalService;

        $this->middleware('auth:sanctum', ['except' => ['getAll', 'getById']]);
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->examQuestionAlternativeService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->examQuestionAlternativeService, $id);
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->examQuestionAlternativeService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->examQuestionAlternativeService, $id);
    }

    public function create(ExamQuestionAlternativeRequest $request)
    {
        try {
            $requestData = $request->all();
            $response = $this->examQuestionAlternativeService->create($requestData);

            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }
}
