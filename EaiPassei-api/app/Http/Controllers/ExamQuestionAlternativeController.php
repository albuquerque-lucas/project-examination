<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamQuestionAlternativeRequest;
use ForbiddenException;
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

        // $this->middleware('auth:sanctum', ['except' => ['getById']]);
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
        try {
            $data = $request->all();
            // return response()->json([
            //     'message' => 'Chegou no Controller das alternativas',
            //     'data' => $data,
            // ], 200);

            $response = $this->examQuestionAlternativeService->update($id, $data);
    
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function delete(int $id)
    {
        try {
            $response = $this->examQuestionAlternativeService->delete($id);
            return response()->json($response->data(), $response->status());

        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function create(Request $request)
    {
        try {
            // return response()->json([
            //     'message' => 'Chegou no Controller das alternativas',
            //     'data' => $request->all(),
            // ], 200);
            $requestData = $request->all();
            $response = $this->examQuestionAlternativeService->create($requestData);

            return response()->json($response->data(), $response->status());
        } catch (ForbiddenException $exception){
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }
}
