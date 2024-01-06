<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Validator;

class UserController extends Controller
{
    public function login(Request $request)
    {
        $loginData = $request->validate([
            'email' => 'email|required',
            'password' => 'required'
        ]);
        if (!auth()->attempt($loginData))
            return response()->json(['message' => 'Login Failed', 'error' => 'Username or Password Incorrect'], 401);

        $token = auth()->user()->createToken('token')->accessToken;
        return response()->json(['message' => 'Login Success', 'success' => $token], 200);

    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'confirm_password' => 'required|same:password',
        ]);
        if ($validator->fails()) {
            return response()->json(['message' => 'Registration Failed', 'error' => $validator->errors()], 422);
        }
        $registerData = $request->all();
        $registerData['password'] = bcrypt($registerData['password']);
        User::create($registerData);
        // $success['token'] = $user->createToken('token')->accessToken;
        // $success['name'] = $user->name;
        return response()->json(['message' => 'Registration Success'], 200);
    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::user()->token()->revoke();
            return response()->json(['message' => 'Logout Success'], 200);
        } else {
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function profile()
    {
        $profile = Auth::user();
        return response()->json(['message' => 'Get Profile Success', 'data' => $profile], 200);

    }
}