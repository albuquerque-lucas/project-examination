<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidDateFormatException;
use App\Http\Requests\ExaminationFormRequest;
use App\Services\DataRetrievalService;
use Error;
use Illuminate\Http\Request;
use App\Services\ExaminationService;
use Exception;
use Illuminate\Support\Carbon;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use DateTime;
use App\Services\DateValidationService;

class ExaminationController extends Controller
{
    protected ExaminationService $examinationService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(ExaminationService $examinationService, DataRetrievalService $dataRetrievalService)
    {
        $this->examinationService = $examinationService;
        $this->dataRetrievalService = $dataRetrievalService;
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->examinationService, $request);
    }

    public function getById($id)
    {
        return $this->dataRetrievalService->getById($this->examinationService, $id);
    }

    public function getByTitle(Request $request)
    {

        try {
            $title = $request->header('title');
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByTitle($title, $order);
            $data = $response->data();
            $dataArray = (array)$data;
            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }
            return response()->json($dataArray['resource'], $response->status());
        } catch (NotFound $notFound) {
            return response()->json(['message' => $notFound->getMessage(), 'code' => $notFound->getCode()], $notFound->getCode());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], $exception->getCode());
        } 
    }

    public function getByInstitution(Request $request)
    {
        try {
            $institution = $request->header('institution');
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByInstitution($institution, $order);
            $data = $response->data();
            $dataArray = (array)$data;
            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }
            return response()->json($dataArray['resource'], $response->status());
        } catch (NotFound $notFound) {
            return response()->json(['message' => $notFound->getMessage(), 'code' => $notFound->getCode()], 404);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        } 
    }

    public function getByRegistrationDate(Request $request)
    {
        try {
            $registrationDate = $request->header('registrationDate');
            $position = $request->query('position', 'start');
            $order = $request->input('order', 'desc');
            $parsedDate = DateValidationService::validateDateFormat($registrationDate);
            // $parsedDate = $this->validateDateFormat($registrationDate);
            $response = $this->examinationService->getByRegistrationDate($parsedDate, $order, $position);

            $data = $response->data();
            $dataArray = (array)$data;
            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }
            return response()->json($dataArray['resource'], $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], $exception->getCode());
        }
    }

    public function getByEducationalLevel(Request $request)
    {
        try {
            $educationalLevelId = $request->header('educational-level');
            $filteredId = filter_var($educationalLevelId, FILTER_VALIDATE_INT);
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByEducationalLevel($filteredId, $order);
            $data = $response->data();
            $dataArray = (array)$data;
            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }
            return response()->json($dataArray['resource'], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        }
    }

    public function getByActivityStatus(Request $request)
    {
        try {
            $isActive = filter_var($request->header('active', true), FILTER_VALIDATE_BOOLEAN);
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByActivityStatus($isActive, $order);
            $data = $response->data();
            $dataArray = (array)$data;
            if (array_key_exists('code', $dataArray)) {
                if ($dataArray['code'] === 204) {
                    return response()->noContent();
                }
            }

            return response()->json($dataArray['resource'], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        }
    }

    public function create(ExaminationFormRequest $request)
    {
        try {
            $requestData = $request->all();
            DateValidationService::validateAndFormatDates($requestData);
            // $this->validateAndFormatDates($requestData);
            $response = $this->examinationService->create($requestData);

            return response()->json($response->data(), $response->status());
        } catch(InvalidDateFormatException $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->examinationService, $id, $request, 'notice_file');
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->examinationService, $id);
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

    private function validateDateFormat($date)
    {
        $parsedDate = DateTime::createFromFormat('Y-m-d', $date);
        if (!$parsedDate) {
            throw new InvalidDateFormatException('Data inválida. Use o formato YYYY-MM-DD.', 400);
        }

        return $parsedDate;
    }


    
}
