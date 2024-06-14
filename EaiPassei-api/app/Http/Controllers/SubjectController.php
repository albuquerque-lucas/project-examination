<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubjectFormRequest;
use App\Services\DataRetrievalService;
use App\Services\SubjectService;
use Exception;
use Illuminate\Http\Request;
use Error;

class SubjectController extends Controller
{
    protected SubjectService $subjectService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(SubjectService $subjectService, DataRetrievalService $dataRetrievalService)
    {
        $this->subjectService = $subjectService;
        $this->dataRetrievalService = $dataRetrievalService;

        // $this->middleware('auth:sanctum', ['except' => ['getAll', 'getById', 'getByTitle']]);
    }

    public function getAll(Request $request)
    {
        $validated = $request->validate([
            'order' => 'nullable|string|in:asc,desc',
            'educational_level_id' => 'nullable|integer',
            'study_area_id' => 'nullable|integer',
            'page' => 'nullable|integer',
        ]);
        $order = $request->input('order', 'desc');
        $params = $validated;
        unset($params['order'], $params['page']);
        $response = $this->subjectService->getAll($order, 'id', $params);
        $data = $response->data();
        $dataArray = (array)$data;
        return response()->json($dataArray['resource'], $response->status());
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->subjectService, $id);
    }

    public function getByTitle(Request $request)
    {
        try {
            $request->validate([
                'title' => 'required|string',
                'order' => 'nullable|string|in:asc,desc'
            ]);
            $title = $request->input('title');
            $order = $request->input('order', 'desc');
            $response = $this->subjectService->getByTitle($title, $order);
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

    public function getByArea(Request $request)
    {
        try {
            $validated = $request->validate([
                'study_area_id' => 'required|array',
                'study_area_id.*' => 'integer',
                'order' => 'nullable|string|in:asc,desc'
                ]);
            $studyAreaIds = $validated['study_area_id'];
            $order = $validated['order'] ?? 'desc';
            $response = $this->subjectService->getByArea($studyAreaIds, $order);
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
        return $this->dataRetrievalService->update($this->subjectService, $id, $request);
    }

    public function delete(Request $request)
    {
        try {
            $deletionList = $request->all();
            if (empty($deletionList)) {
                return response()->json(['message' => 'Nenhuma materia identificada.'], 200);
            }
            $response = $this->subjectService->delete($deletionList);
            return response()->json($response->data(), $response->status());
    
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function create(SubjectFormRequest $request)
    {
        try {
            $requestData = $request->all();
            $response = $this->subjectService->create($requestData);

            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }
}
