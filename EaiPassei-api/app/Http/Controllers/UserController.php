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
        try {
            $data = $request->all();
            if ($request->hasFile('profile_img')) {
                $file = $request->file('profile_img');
                $extension = $file->getClientOriginalExtension();
                if ($extension !== 'jpg' && $extension !== 'jpeg' && $extension !== 'png') {
                    throw new Exception('Extensão inválida. O arquivo deve ser uma imagem nos formados jpg, jpeg ou png.', 400);
                }
                $path = $file->store('profile_img', 'public');
                $data = ['profile_img' => $path];
                $hasFile = true;
            } else {
                $path = null;
                $hasFile = false;
            }
            $response = $this->userService->update($id, $data, $hasFile);
            return response()->json($response->data(), 200);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], 400);
        }
    }

    public function delete(int $id)
    {
        return $this->dataRetrievalService->delete($this->userService, $id);
    }

    public function create(UserFormRequest $request)
    {
        try {
            $requestData = $request->all();
            $user = $this->userService->register($requestData);

            // if (get_class($user) === 'App\Models\ServiceResponse') {
            //     return response()->json([
            //         'message' => 'Usuario ja registrado.'
            //     ], 409);
            // }

            // if (get_class($user) === 'stdClass') {
            //     return response()->json([
            //         'message' => 'Usuario ja registrado.'
            //     ], 409);
            // }
            $token = $user->createToken('eaipassei-app')->plainTextToken;
            $cookie = cookie('token', $token, 60 * 24);

            return response()->json([
                'user' => $user,
                'token' => $token,
            ], 201)->withCookie($cookie);
        } catch (Exception $exception) {
            return response()->json(['message' => $exception->getMessage(), 'code' => $exception->getCode()], $exception->getCode() | 400);
        }
    }
}
