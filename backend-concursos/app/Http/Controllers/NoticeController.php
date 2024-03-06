<?php

namespace App\Http\Controllers;

use App\Http\Requests\NoticeFormRequest;
use App\Http\Resources\NoticeResource;
use App\Services\NoticeService;
use Illuminate\Http\Request;
use Exception;
use Error;
use App\Exceptions\InvalidDateFormatException;

class NoticeController extends Controller
{
    protected $noticeService;

    public function __construct(NoticeService $noticeService)
    {
        $this->noticeService = $noticeService;
    }

    public function getAll(Request $request)
    {
        try {
            $order = $request->input('order', 'desc');
            $response = $this->noticeService->getAll($order);
            $data = $response->data();
            $dataArray = (array)$data;
            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }
            return response()->json($dataArray['resource'], $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        } catch (Error $error) {
            return response()->json([
                'error' => 'Ocorreu um erro inesperado.',
                'message' => $error->getMessage(),
                'code' => $error->getCode()
        ], 500);
        }
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
            $resource = new NoticeResource($response->data());
            return $resource;
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        }
    }

    public function create(NoticeFormRequest $request)
    {
        try {
            $requestData = $request->all();
            $this->validateAndFormatDates($requestData);
            $response = $this->noticeService->create($requestData);

            return response()->json($response->data(), $response->status());
        } catch(InvalidDateFormatException $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }
}
