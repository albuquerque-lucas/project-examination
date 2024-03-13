<?php

namespace App\Http\Controllers;

use App\Http\Requests\StudyAreaFormRequest;
use App\Models\StudyArea;
use App\Services\DataRetrievalService;
use App\Services\StudyAreaService;
use Illuminate\Http\Request;
use Error;
use Exception;

class StudyAreaController extends Controller
{
    protected StudyAreaService $studyAreaService;

    private DataRetrievalService $dataRetrievalService;

    public function __construct(StudyAreaService $studyAreaService, DataRetrievalService $dataRetrievalService)
    {
        $this->studyAreaService = $studyAreaService;
        $this->dataRetrievalService = $dataRetrievalService;
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->studyAreaService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->studyAreaService, $id);
    }

    public function getByArea(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'area' => 'required|string',
                'order' => 'string|in:asc,desc',
            ]);
            $area = $validatedData['area'];
            $order = $request->input('order', 'desc');
            $response = $this->studyAreaService->getByArea($area, $order);
            return response()->json($response->data(), $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 400);
        }
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->studyAreaService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->studyAreaService, $id);
    }

    public function create(StudyAreaFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->studyAreaService, $request);
    }
}
