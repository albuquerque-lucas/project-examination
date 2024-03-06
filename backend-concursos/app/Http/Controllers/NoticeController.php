<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeFormRequest;
use App\Http\Resources\NoticeResource;
use App\Services\DataRetrievalService;
use App\Services\DateValidationService;
use App\Services\NoticeService;
use Illuminate\Http\Request;
use Exception;
use Error;
use App\Exceptions\InvalidDateFormatException;

class NoticeController extends Controller
{
    protected NoticeService $noticeService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(NoticeService $noticeService, DataRetrievalService $dataRetrievalService)
    {
        $this->noticeService = $noticeService;
        $this->dataRetrievalService = $dataRetrievalService;
    }

    public function getAll(Request $request)
    {
        $this->dataRetrievalService->getAll($this->noticeService, $request);
    }

    public function getById(int $id)
    {
        try {
            $response = $this->noticeService->getById($id);
            $data = $response->data();
            $dataArray = (array)$data;
            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }
            return response()->json($data, $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        }
    }

    public function create(NoticeFormRequest $request)
    {
        try {
            $requestData = $request->all();
            DateValidationService::validateAndFormatDates($requestData);
            // $this->validateAndFormatDates($requestData);
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
        try {
            $data = $request->all();
            $hasFile = false;

            if ($request->hasFile('notice_file')) {
                $noticePath = '';
                $data['notice_file'] = $noticePath;
                $hasFile = true;
            }

            $response = $this->noticeService->update($id, $data, $hasFile);
    
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function delete(int $id)
    {
        try {
            $response = $this->noticeService->delete($id);
            return response()->json($response->data(), $response->status());

        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
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
