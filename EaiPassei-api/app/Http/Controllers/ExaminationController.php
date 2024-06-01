<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidDateFormatException;
use App\Http\Requests\ExaminationFormRequest;
use App\Http\Requests\ExaminationListFormRequest;
use App\Services\DataRetrievalService;
use Auth;
use Error;
use Illuminate\Http\Request;
use App\Services\ExaminationService;
use Exception;
use Illuminate\Support\Carbon;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use DateTime;
use App\Services\DateValidationService;
use App\Models\Examination;

class ExaminationController extends Controller
{
    protected ExaminationService $examinationService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(ExaminationService $examinationService, DataRetrievalService $dataRetrievalService)
    {
        $this->examinationService = $examinationService;
        $this->dataRetrievalService = $dataRetrievalService;

        $this->middleware('auth:sanctum');
    }

    public function getAll(Request $request)
    {
        $this->authorize('manage', $request->user());
        $validated = $request->validate([
            'order' => 'nullable|string|in:asc,desc',
            'title' => 'nullable|string',
            'institution' => 'nullable|string',
            'educational_level_id' => 'nullable|string',
            'page' => 'nullable|integer',
        ]);
        $order = $request->input('order', 'desc');
        $params = $validated;
        unset($params['order'], $params['page']);
        $response = $this->examinationService->getAll($order, 'id', $params);
        $data = $response->data();
        $dataArray = (array)$data;
        return response()->json($dataArray['resource'], $response->status());
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->examinationService, $id);
    }

    public function create(ExaminationFormRequest $request)
    {
        try {
            $data = $request->all();
            $response = $this->examinationService->create($data);

            return response()->json($response->data(), $response->status());
        } catch(InvalidDateFormatException $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function update(Request $request, int $id)
    {
        $this->authorize('manage', $request->user());
        return $this->dataRetrievalService->update($this->examinationService, $id, $request, 'notice_file');
    }

    public function delete(Request $request, int $id)
    {
        $this->authorize('manage', $request->user());
        return $this->dataRetrievalService->delete($this->examinationService, $id);
    }

    public function associateStudyArea(Request $request)
    {
        try {
            $this->authorize('manage', $request->user());
            $validated = $request->validate([
                'examination_id' => 'required|integer',
                'study_area_id' => 'required|integer',
            ]);
            $response = $this->examinationService->associateStudyArea($validated['examination_id'], $validated['study_area_id']);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }
    
}
