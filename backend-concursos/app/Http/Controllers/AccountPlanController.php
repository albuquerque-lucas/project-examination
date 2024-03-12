<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccountPlanFormRequest;
use Illuminate\Http\Request;
use App\Services\AccountPlanService;
use App\Services\DataRetrievalService;
use Exception;
use Error;

class AccountPlanController extends Controller
{
    protected AccountPlanService $accountPlanService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(AccountPlanService $accountPlanService, DataRetrievalService $dataRetrievalService)
    {
        $this->accountPlanService = $accountPlanService;
        $this->dataRetrievalService = $dataRetrievalService;
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->accountPlanService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->accountPlanService, $id);
    }

    public function getByName(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string',
                'order' => 'nullable|string|in:asc,desc',
            ]);
            $name = $validated['name'];
            $response = $this->accountPlanService->getByName($name);
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
        return $this->dataRetrievalService->update($this->accountPlanService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->accountPlanService, $id);
    }

    public function create(AccountPlanFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->accountPlanService, $request);
    }
}
