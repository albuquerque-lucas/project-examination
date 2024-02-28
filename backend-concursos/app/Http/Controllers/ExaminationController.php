<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidDateFormatException;
use App\Http\Requests\ExaminationFormRequest;
use Illuminate\Http\Request;
use App\Services\ExaminationService;
use Exception;
use InvalidArgumentException;
use DateTime;
use Illuminate\Support\Carbon;

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
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }

    public function getById(Request $request)
    {
        try {
            $id = $request->route('id');

            $response = $this->examinationService->getById($id);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);
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
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }

    public function getByInstitution(Request $request)
    {
        try {
            $institution = $request->header('institution');
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByInstitution($institution, $order);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }

    public function getByRegistrationDate(Request $request)
    {
        try {
            $registrationDate = $request->header('registrationDate');
            $position = $request->query('position', 'start');
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByRegistrationDate($registrationDate, $order, $position);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }

    public function create(ExaminationFormRequest $request)
    {
        try {
            $requestData = $request->all();
            $this->validateAndFormatDates($requestData);
            $response = $this->examinationService->create($requestData);
            return response()->json($response->data(), $response->status());
        } catch(InvalidDateFormatException $exception) {
            return response()->json(['message' => $exception->getMessage()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage()], 500);
        }
    }

    private function validateAndFormatDates(array &$requestData)
    {
        $dateFields = ['registration_start_date', 'registration_end_date', 'exams_start_date', 'exams_end_date'];
        foreach ($dateFields as $field) {
            if (isset($requestData[$field]) && !empty($requestData[$field])) {
                try {
                    $formattedDate = Carbon::createFromFormat('Y-m-d', $requestData[$field])->format('Y-m-d');
                    $requestData[$field] = $formattedDate;
                } catch (Exception $e) {
                    throw new InvalidDateFormatException('Data inválida. Use o formato YYYY-MM-DD.');
                }
            }
        }
    }


    
}
