<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

// 3|uXEG17Fi9NF05K1bXkd96tMC4RDdQsJSENyyf5Vba2eb3548
class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('username', 'password');
        $user = User::where('username', $credentials['username'])->first();

        if (!$user || !Hash::check($credentials['password'], $user->password)) {
            return response([
                'message' => 'Username or password is incorrect.'
            ], 401);
        }

        $token = $user->createToken('eaipassei-app')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return response()->json([
            'user' => new UserResource($user),
            'token' => $token,
        ])->withCookie($cookie);
        // if (Auth::attempt($request->only('username', 'password'))) {
        //     $user = Auth::user();
        //     $token = $user->createToken('eaipassei-app')->plainTextToken;
        //     $cookie = cookie('token', $token, 60 * 24);
        //     return response([
        //         'message' => 'Authorized.',
        //         'token' => $token,
        //         'user' => $user
        //     ], 200)->withCookie($cookie);
        // } else {
        //     return response([
        //         'message' => 'Invalid credentials'
        //     ], 401);
        // }

    }

    public function logout(Request $request)
    {
        $user = auth('sanctum')->user();
        $user->currentAccessToken()->delete();
        $cookie = cookie()->forget('token');


        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }

    // get the authenticated user method
    public function user(Request $request) {
        $user = auth('sanctum')->user();
        return new UserResource($user);
    }

}
