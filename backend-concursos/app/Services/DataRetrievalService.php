<?php

namespace App\Services;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Exception;
use Error;
use App\Exceptions\InvalidDateFormatException;
use App\Interfaces\IService;

class DataRetrievalService
{
    public function getAll(IService $service, Request $request): JsonResponse | Response
    {
        try {
            $request->validate([
                'order' => 'nullable|string|in:asc,desc',
            ]);
            $order = $request->input('order', 'desc');
            $response = $service->getAll($order);
            $data = $response->data();
            $dataArray = (array)$data;

            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }

            return response()->json($dataArray['resource'], $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'error' => 'Ocorreu um erro inesperado.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 500);
        }
    }

    public function getById(IService $service, int $id = null): JsonResponse | Response
    {
        try {
            
            $response = $service->getById($id);
            $data = (array) $response->data();
            if (array_key_exists('code', $data) && $data['code'] === 204) {
                return response()->noContent();
            }
    
            return response()->json($response->data(), $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'error' => 'Ocorreu um erro inesperado.',
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 500);
        }
    }

    public function update(IService $service, int $id, Request $request, string $fileInput = null): JsonResponse | Response
    {
        try {
            $data = $request->all();
            $hasFile = false;

            if ($request->hasFile($fileInput)) {
                $noticePath = '';
                $data[$fileInput] = $noticePath;
                $hasFile = true;
            }

            $response = $service->update($id, $data, $hasFile);
    
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function delete(IService $service, int $id): JsonResponse | Response
    {
        try {
            $response = $service->delete($id);
            return response()->json($response->data(), $response->status());

        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function create(IService $service, FormRequest $request): JsonResponse | Response
    {
        try {
            $requestData = $request->all();
            DateValidationService::validateAndFormatDates($requestData);
            $response = $service->create($requestData);

            return response()->json($response->data(), $response->status());
        } catch(InvalidDateFormatException $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }
}