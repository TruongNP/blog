<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\GeneralSetting;

class ApiGeneralSettingController extends Controller
{
    public function index()
    {
        $result = GeneralSetting::all();
        
        return response()->json($result, 201);
    }

    public function store(Request $request) 
    {
        $general_setting = new GeneralSetting();

        $general_setting->store_name = $request->store_name;
        $general_setting->store_logo = $request->store_logo;
        $general_setting->account_email = $request->account_email;
        $general_setting->sender_email = $request->sender_email;
        $general_setting->legal_name = $request->legal_name;
        $general_setting->phone = $request->phone;
        $general_setting->address = $request->address;
        $general_setting->city = $request->city;
        $general_setting->country = $request->country;
        $general_setting->timezone = $request->timezone;
        $general_setting->currency = $request->currency;
        $general_setting->currency_code = $request->currency_code;

        $general_setting->save();

        $return=[
            "success" => "Product has been saved"
        ];
        return response()->json($return);
    }

    public function update(Request $request) 
    {
        $general_setting = GeneralSetting::find($request->id);

        $general_setting->store_name = $request->store_name;
        $general_setting->store_logo = $request->store_logo;
        $general_setting->account_email = $request->account_email;
        $general_setting->sender_email = $request->sender_email;
        $general_setting->legal_name = $request->legal_name;
        $general_setting->phone = $request->phone;
        $general_setting->address = $request->address;
        $general_setting->city = $request->city;
        $general_setting->country = $request->country;
        $general_setting->timezone = $request->timezone;
        $general_setting->currency = $request->currency;
        $general_setting->currency_code = $request->currency_code;

        $general_setting->save();

        $return=[
            "success" => "Product has been saved"
        ];
        return response()->json($return);
    }
}
