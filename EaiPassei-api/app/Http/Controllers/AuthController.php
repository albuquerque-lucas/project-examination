<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Auth\AuthenticationException;

// 3|uXEG17Fi9NF05K1bXkd96tMC4RDdQsJSENyyf5Vba2eb3548
class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum', ['except' => ['login']]);
    }
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('username', 'password');
            $user = User::where('username', $credentials['username'])->first();

            if (!$user || !Hash::check($credentials['password'], $user->password)) {
                throw new AuthenticationException('Username or password is incorrect.');
            }

            $token = $user->createToken('eaipassei-app')->plainTextToken;

            $cookie = cookie('token', $token, 60 * 24);

            return response()->json([
                'user' => new UserResource($user),
                'token' => $token,
            ])->withCookie($cookie);
        } catch (AuthenticationException $e) {
            return response([
                'message' => $e->getMessage(),
                'info' => 'Excessao de Autenticacao.'
            ], 401);
        } catch (Exception $e) {
            // Log the exception for debugging
            // ...
            return response([
                'message' => 'An unexpected error occurred.'
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $user = auth('sanctum')->user();
            $user->currentAccessToken()->delete();
            $cookie = cookie()->forget('token');

            return response()->json([
                'message' => 'Logged out successfully!'
            ])->withCookie($cookie);
        } catch (Exception $e) {
            return response([
                'message' => 'An error occurred while logging out.'
            ], 500);
        }
    }

    // get the authenticated user method
    public function user(Request $request) {
        try {
            $user = auth('sanctum')->user();
            return new UserResource($user);
        } catch (Exception $e) {
            return response([
                'message' => 'Ocorreu um erro ao buscar usuario.',
                'info' => $e->getMessage(),
            ], 500);
        }
    }

}
