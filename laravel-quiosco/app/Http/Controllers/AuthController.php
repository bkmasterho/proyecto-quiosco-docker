<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegistroRequest;

//sail artisan make:controller AuthController

class AuthController extends Controller
{
    
    public function register(RegistroRequest $request){
        //Validar el registro
        $data = $request->validated();

        // Crear el usuario 
        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password'])
        ]);

        return [
            'token' => $user->createToken('token')->plainTextToken,
            'user' => $user
        ];
    }
    
    public function login(LoginRequest $request){
        
        $data = $request->validated();
    }
    
    public function logout(Request $request){

    }
}
