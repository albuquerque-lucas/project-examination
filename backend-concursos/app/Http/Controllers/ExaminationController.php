<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidDateFormatException;
use App\Http\Requests\ExaminationFormRequest;
use App\Http\Resources\ExaminationResource;
use Error;
use Illuminate\Http\Request;
use App\Services\ExaminationService;
use Exception;
use Illuminate\Support\Carbon;
use Spatie\FlareClient\Http\Exceptions\NotFound;

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
            $data = $response->data();
            $convertedData = (array)$data;

            if (array_key_exists('code', $convertedData)) {
                if ($convertedData['code'] === 404) {
                    return response()->noContent();
                }
            }

            $collection = ExaminationResource::collection($data);
            return $collection;
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

    public function getById(Request $request)
    {
        try {
            $id = $request->query('id');
            $response = $this->examinationService->getById($id);
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        }
    }

    public function getByTitle(Request $request)
    {

        try {
            $title = $request->header('title');
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByTitle($title, $order);

            return response()->json($response->data(), $response->status());
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
            return response()->json($response->data(), $response->status());
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
        
            $response = $this->examinationService->getByRegistrationDate($registrationDate, $order, $position);

            return response()->json($response->data(), $response->status());
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

            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], $exception->getCode());
        }
    }

    public function getByActivityStatus(Request $request)
    {
        try {
            $isActive = filter_var($request->header('active', true), FILTER_VALIDATE_BOOLEAN);
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByActivityStatus($isActive, $order);
            
            return response()->json($response->data(), $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], $exception->getCode());
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
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 422);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], $exception->getCode());
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
