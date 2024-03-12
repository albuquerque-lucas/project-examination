<?php

namespace App\Http\Controllers;

use App\Services\DataRetrievalService;
use App\Services\EducationalLevelService;
use App\Http\Requests\EducationalLevelFormRequest;
use Illuminate\Http\Request;
use Exception;
use Error;

class EducationalLevelController extends Controller
{
    protected EducationalLevelService $educationalLevelService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(EducationalLevelService $educationalLevelService, DataRetrievalService $dataRetrievalService)
    {
        $this->educationalLevelService = $educationalLevelService;
        $this->dataRetrievalService = $dataRetrievalService;
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->educationalLevelService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->educationalLevelService, $id);
    }

    public function getByName(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
            ]);
            $name = $validated['name'];
            $response = $this->educationalLevelService->getByName($name);
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
        return $this->dataRetrievalService->update($this->educationalLevelService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->educationalLevelService, $id);
    }

    public function create(EducationalLevelFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->educationalLevelService, $request);
    }
}
