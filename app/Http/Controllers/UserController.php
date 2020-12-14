<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Validator;
use App\Http\Requests\LoginRequest;

class UserController extends Controller
{
    public function getLogin() 
    {
        return view('admin.login');
    }

    public function postLogin(LoginRequest $request) 
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password]))
        {
            return redirect('/admin');
        }
        else {
            return redirect('/admin/login')->with('message' , 'Email or Password incorrect!');
        }
    }

    public function getLogout() 
    {
        Auth::logout();
        return redirect('admin/login');
    }
}
