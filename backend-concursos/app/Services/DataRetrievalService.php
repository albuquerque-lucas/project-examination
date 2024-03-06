<?php

namespace App\Services;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Exception;
use Error;

class DataRetrievalService
{
    public function getAll(IService $service, Request $request): JsonResponse
    {
        try {
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
}