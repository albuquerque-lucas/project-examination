<?php

namespace App\Http\Controllers;

use App\Http\Requests\AccessLevelRequest;
use App\Services\AccessLevelService;
use App\Services\DataRetrievalService;
use Illuminate\Http\Request;

class AccessLevelController extends Controller
{
    protected AccessLevelService $accessLevelService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(AccessLevelService $accessLevelService, DataRetrievalService $dataRetrievalService)
    {
        $this->accessLevelService = $accessLevelService;
        $this->dataRetrievalService = $dataRetrievalService;
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->accessLevelService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->accessLevelService, $id);
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->accessLevelService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->accessLevelService, $id);
    }

    public function create(AccessLevelRequest $request)
    {
        return $this->dataRetrievalService->create($this->accessLevelService, $request);
    }
}
