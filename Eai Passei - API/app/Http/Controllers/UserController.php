<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFormRequest;
use App\Services\DataRetrievalService;
use App\Services\UserService;
use Illuminate\Http\Request;
use Exception;
use Error;

class UserController extends Controller
{
    protected UserService $userService;

    private DataRetrievalService $dataRetrievalService;

    public function __construct(UserService $userService, DataRetrievalService $dataRetrievalService)
    {
        $this->userService = $userService;
        $this->dataRetrievalService = $dataRetrievalService;

        $this->middleware('auth:sanctum', ['except' => ['create']]);
    }

    public function getAll(Request $request)
    {
        return $this->dataRetrievalService->getAll($this->userService, $request);
    }

    public function getById(int $id)
    {
        return $this->dataRetrievalService->getById($this->userService, $id);
    }

    public function getByName(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string',
                'order' => 'string|in:asc,desc',
            ]);
            $name = $validatedData['name'];
            $order = $request->input('order', 'desc');
            $response = $this->userService->getByName($name, $order);
            return response()->json($response->data(), $response->status());
        } catch (Exception | Error $exception) {
            return response()->json([
                'message' => $exception->getMessage(),
                'code' => $exception->getCode()
            ], 400);
        }
    }

    public function update(Request $request, int $id)
    {
        return $this->dataRetrievalService->update($this->userService, $id, $request);
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->userService, $id);
    }

    public function create(UserFormRequest $request)
    {
        return $this->dataRetrievalService->create($this->userService, $request);
    }
}
