<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeFormRequest;
use App\Http\Resources\NoticeResource;
use App\Services\DataRetrievalService;
use App\Services\DateValidationService;
use App\Services\NoticeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;
use Error;
use App\Exceptions\InvalidDateFormatException;
use Illuminate\Http\Response;

class NoticeController extends Controller
{
    protected NoticeService $noticeService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(NoticeService $noticeService, DataRetrievalService $dataRetrievalService)
    {
        $this->noticeService = $noticeService;
        $this->dataRetrievalService = $dataRetrievalService;

        $this->middleware('auth:sanctum', ['except' => ['getAll', 'getById']]);
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->noticeService, $request);
    }

    public function getById(int $id): JsonResponse | Response
    {
        return $this->dataRetrievalService->getById($this->noticeService, $id);
    }

    public function create(NoticeFormRequest $request)
    {
        try {
            $requestData = $request->all();
            DateValidationService::validateAndFormatDates($requestData);
            $response = $this->noticeService->create($requestData);

            return response()->json($response->data(), $response->status());
        } catch(InvalidDateFormatException $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->noticeService, $id, $request, 'notice_file');
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->noticeService, $id);
    }

    public function deleteByExamination(int $id)
    {
        try {
            $response = $this->noticeService->deleteByExamination($id);
            return response()->json($response->data(), $response->status());

        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }
}
