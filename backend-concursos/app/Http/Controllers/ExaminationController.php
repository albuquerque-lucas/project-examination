<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\ExaminationService;
use Exception;

class ExaminationController extends Controller
{
    protected $examinationService;

    public function __construct(ExaminationService $examinationService)
    {
        $this->examinationService = $examinationService;
    }

    public function getAll(Request $request)
    {
        try {
            $order = $request->query('order', 'desc');
            $response = $this->examinationService->getAll($order);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['error' => $exception->getMessage()], 500);
        }
    }
}
