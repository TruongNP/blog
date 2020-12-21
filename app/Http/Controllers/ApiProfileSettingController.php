<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ApiProfileSettingController extends Controller
{
    public function index()
    {
        $result = User::orderBy('id', 'desc')->get();
        
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
        $filter_name = ''.$request->first_name.' '.$request->last_name.'';

        $profile_setting->avata = $request->avata;
        $profile_setting->first_name = $request->first_name;
        $profile_setting->last_name = $request->last_name;
        $profile_setting->filter_name = $filter_name;
        $profile_setting->phone_number = $request->phone_number;
        $profile_setting->website = $request->website;
        $profile_setting->email = $request->email;
        $profile_setting->password = Hash::make($request->password);
        $profile_setting->address = $request->address;
        $profile_setting->city = $request->city;
        $profile_setting->country = $request->country;
        $profile_setting->role = $request->role;

        $profile_setting->save();

        $return=[
            "success" => "User has been saved"
        ];
        return response()->json($return);
    }

    public function update(Request $request) 
    {
        $profile_setting = User::find($request->id);
        $filter_name = ''.$request->first_name.' '.$request->last_name.'';

        $profile_setting->avata = $request->avata;
        $profile_setting->first_name = $request->first_name;
        $profile_setting->last_name = $request->last_name;
        $profile_setting->filter_name = $filter_name;
        $profile_setting->phone_number = $request->phone_number;
        $profile_setting->website = $request->website;
        $profile_setting->address = $request->address;
        $profile_setting->city = $request->city;
        $profile_setting->country = $request->country;

        $profile_setting->save();

        $return=[
            "success" => "User has been saved"
        ];
        return response()->json($return);
    }

    function delete($id)
    {
        $collection = User::find($id);

        $collection->delete();
    }
}
