<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class ApiProfileSettingController extends Controller
{
    public function index()
    {
        $result = User::all();
        
        return response()->json($result, 201);
    }

    function getUserById($id)
    {
        $user = User::find($id);

        return response()->json($user, 201);
    }

    public function store(Request $request) 
    {
        $profile_setting = new User();

        $profile_setting->avata = $request->avata;
        $profile_setting->first_name = $request->first_name;
        $profile_setting->last_name = $request->last_name;
        $profile_setting->phone_number = $request->phone_number;
        $profile_setting->website = $request->website;
        $profile_setting->email = $request->email;
        $profile_setting->password = Hash::make($request->password);
        $profile_setting->role = $request->role;

        $profile_setting->save();

        $return=[
            "success" => "Product has been saved"
        ];
        return response()->json($return);
    }

    public function update(Request $request) 
    {
        $profile_setting = User::find($request->id);

        $profile_setting->avata = $request->avata;
        $profile_setting->first_name = $request->first_name;
        $profile_setting->last_name = $request->last_name;
        $profile_setting->phone_number = $request->phone_number;
        $profile_setting->website = $request->website;

        $profile_setting->save();

        $return=[
            "success" => "Product has been saved"
        ];
        return response()->json($return);
    }

}
