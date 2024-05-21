<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamFormRequest;
use App\Services\DataRetrievalService;
use App\Services\ExamService;
use Illuminate\Http\Request;
use Exception;
use Error;

class ExamController extends Controller
{
    protected ExamService $examService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(ExamService $examService, DataRetrievalService $dataRetrievalService)
    {
        $this->examService = $examService;
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

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->examService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->examService, $id);
    }

    public function create(ExamFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->examService, $request);
    }
}
