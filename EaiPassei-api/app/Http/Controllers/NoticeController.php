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

        // $this->middleware('auth:sanctum', ['except' => ['getAll', 'getById']]);
    }
    
    public function getAll(Request $request)
    {
        // $this->authorize('manage', $request->user());
        $validated = $request->validate([
            'order' => 'nullable|string|in:asc,desc',
            'examination' => 'nullable|string',
            'examination_id' => 'nullable|integer',
            'page' => 'nullable|integer',
        ]);
        $order = $request->input('order', 'desc');
        $params = $validated;
        unset($params['order'], $params['page']);
        $response = $this->noticeService->getAll($order, 'id', $params);
        $data = $response->data();
        $dataArray = (array)$data;
        return response()->json($dataArray['resource'], $response->status());
    }

    public function getById(int $id): JsonResponse | Response
    {
        return $this->dataRetrievalService->getById($this->noticeService, $id);
    }

    public function create(Request $request)
    {
        try {
            $requestData = $request->all();

            if ($request->hasFile('notice_file')) {
                $filePath = $request->file('notice_file')->store('notices', 'public');
            } else {
                $filePath = null;
            }
            
            // return response()->json($filePath, 200);
            $data = [
                'examination_id' => $requestData['examination_id'],
                'file_name' => $requestData['file_name'],
                'file_path' => $filePath,
                'extension' => $requestData['extension'],
            ];

            $response = $this->noticeService->create($data);
    
            return response()->json($response->data(), $response->status());
        } catch(InvalidDateFormatException $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function uploadFile(Request $request) {
        try {
            if ($request->hasFile('notice_file')) {
                $filePath = $request->file('notice_file')->store('notices', 'public');
            }
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->noticeService, $id, $request, 'notice_file');
    }

    public function delete(Request $request)
    {
        try {
            $deletionList = $request->all();
            if (empty($deletionList)) {
                return response()->json(['message' => 'No Notices'], 200);
            }
            $response = $this->noticeService->delete($deletionList);
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
