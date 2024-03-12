<?php

namespace App\Http\Controllers;

use App\Services\DataRetrievalService;
use App\Services\EducationalLevelService;
use App\Http\Requests\EducationalLevelFormRequest;
use Illuminate\Http\Request;

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
