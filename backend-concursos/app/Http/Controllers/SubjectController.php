<?php

namespace App\Http\Controllers;

use App\Services\DataRetrievalService;
use App\Services\SubjectService;
use Illuminate\Http\Request;

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

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->subjectService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->subjectService, $id);
    }

    public function create(Request $request)
    {
        
    }
}
