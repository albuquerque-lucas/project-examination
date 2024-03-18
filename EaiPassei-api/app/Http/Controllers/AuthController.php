<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

// 3|uXEG17Fi9NF05K1bXkd96tMC4RDdQsJSENyyf5Vba2eb3548
class AuthController extends Controller
{
    public function login(Request $request)
    {
        if (Auth::attempt($request->only('username', 'password'))) {
            $user = Auth::user();
            $token = $user->createToken('app')->plainTextToken;
            return response([
                'message' => 'Authorized.',
                'token' => $token,
                'user' => $user
            ], 200);
        } else {
            return response([
                'message' => 'Invalid credentials'
            ], 401);
        }

    }
}
