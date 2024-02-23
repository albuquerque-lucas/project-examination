<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExaminationFormRequest;
use Illuminate\Http\Request;
use App\Services\ExaminationService;
use Exception;
use InvalidArgumentException;

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
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getAll($order);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['Controller Error' => $exception->getMessage()], 500);
        }
    }

    public function getById(Request $request)
    {
        try {
            $id = $request->route('id');

            $response = $this->examinationService->getById($id);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['Controller Error' => $exception->getMessage()], 500);
        }
    }

    public function getByTitle(Request $request)
    {
        try {
            $title = $request->header('title');
            $order = $request->input('order', 'desc');

            $response = $this->examinationService->getByTitle($title, $order);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['Controller Error' => $exception->getMessage()], 500);
        }
    }

    public function getByInstitution(Request $request)
    {
        try {
            $institution = $request->query('institution');
            $order = $request->input('order', 'desc');

            $response = $this->examinationService->getByInstitution($institution, $order);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['Controller Error' => $exception->getMessage()], 500);
        }
    }

    public function getByExamDate(Request $request)
    {
        try {
            $examDate = $request->query('examDate');
            $order = $request->input('order', 'desc');
    
            $response = $this->examinationService->getByExamDate($examDate, $order);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['Controller Error' => $exception->getMessage()], 500);
        }
    }

    public function create(ExaminationFormRequest $request)
    {
        try {
            $requestData = $request->all();
            $response = $this->examinationService->create($requestData);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['Controller Error' => $exception->getMessage()], 500);
        }
    }
    
}
