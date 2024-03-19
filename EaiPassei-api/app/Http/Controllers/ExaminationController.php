<?php

namespace App\Http\Controllers;

use App\Exceptions\InvalidDateFormatException;
use App\Http\Requests\ExaminationFormRequest;
use App\Services\DataRetrievalService;
use Auth;
use Error;
use Illuminate\Http\Request;
use App\Services\ExaminationService;
use Exception;
use Illuminate\Support\Carbon;
use Spatie\FlareClient\Http\Exceptions\NotFound;
use DateTime;
use App\Services\DateValidationService;
use App\Models\Examination;

class ExaminationController extends Controller
{
    protected ExaminationService $examinationService;
    private DataRetrievalService $dataRetrievalService;

    public function __construct(ExaminationService $examinationService, DataRetrievalService $dataRetrievalService)
    {
        $this->examinationService = $examinationService;
        $this->dataRetrievalService = $dataRetrievalService;

        $this->middleware('auth:sanctum',
            ['only' => ['create', 'update', 'delete']]
        );
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->examinationService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->examinationService, $id);
    }

    public function getByTitle(Request $request)
    {

        try {
            $validated = $request->validate([
                'title' => 'required|string',
                'order' => 'nullable|string|in:asc,desc',
            ]);
            $title = $validated['title'];
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByTitle($title, $order);
            $data = $response->data();
            $dataArray = (array)$data;

            return response()->json($dataArray['resource'], $response->status());
        } catch (NotFound $notFound) {
            return response()->json(['message' => $notFound->getMessage(), 'code' => $notFound->getCode()], 404);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => 400], 400);
        } 
    }

    public function getByInstitution(Request $request)
    {
        try {
            $validated = $request->validate([
                'institution' => 'required',
                'order' => 'nullable|string|in:asc,desc',
            ]);
            $institution = $validated['institution'];
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByInstitution($institution, $order);
            $data = $response->data();
            $dataArray = (array)$data;

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
            $validated = $request->validate([
                'registrationDate' => 'required|date_format:Y-m-d',
                'order' => 'nullable|string|in:asc,desc',
                'position' => 'nullable|in:start,end'
            ]);
            $registrationDate = $validated['registrationDate'];
            $position = $request->query('position', 'start');
            $order = $request->input('order', 'desc');
            $parsedDate = DateValidationService::validateDateFormat($registrationDate);
            $response = $this->examinationService->getByRegistrationDate($parsedDate, $order, $position);

            $data = $response->data();
            $dataArray = (array)$data;

            return response()->json($dataArray['resource'], $response->status());
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function getByEducationalLevel(Request $request, int $id)
    {
        try {
            $request->validate([
                'order' => 'nullable|string|in:asc,desc',
            ]);
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByEducationalLevel($id, $order);
            $data = (array)$response->data();
            return response()->json($data['resource'], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        }
    }

    public function getByActivityStatus(Request $request)
    {
        try {
            $request->validate([
                'active' => 'string|in:true,false',
                'order' => 'nullable|string|in:asc,desc',
            ]);
            $isActive = filter_var($request->input('active', true), FILTER_VALIDATE_BOOLEAN);
            $order = $request->input('order', 'desc');
            $response = $this->examinationService->getByActivityStatus($isActive, $order);
            $data = $response->data();
            $dataArray = (array)$data;


            return response()->json($dataArray['resource'], 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 500);
        }
    }

    public function create(ExaminationFormRequest $request)
    {
        try {
            $this->authorize('create', $request->user());
            return $this->dataRetrievalService->create($this->examinationService, $request);

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
    
}
