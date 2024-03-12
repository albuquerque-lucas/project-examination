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
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->subjectService, $request);
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
                'error' => 'Ocorreu um erro inesperado.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 500);
        }
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->subjectService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->subjectService, $id);
    }

    public function create(SubjectFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->subjectService, $request);
    }
}
