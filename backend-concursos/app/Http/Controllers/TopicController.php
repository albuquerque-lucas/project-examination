<?php

namespace App\Http\Controllers;

use App\Http\Requests\TopicFormRequest;
use App\Services\TopicService;
use Illuminate\Http\Request;
use App\Services\DataRetrievalService;

class TopicController extends Controller
{
    protected TopicService $topicService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(TopicService $topicService, DataRetrievalService $dataRetrievalService)
    {
        $this->topicService = $topicService;
        $this->dataRetrievalService = $dataRetrievalService;
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->topicService, $request);
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

    public function create(TopicFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->subjectService, $request);
    }
}
