<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Orders;

class ApiOrdersController extends Controller
{
    public function index()
    {
        $result = Orders::all();
        
        return response()->json($result, 201);
    }

    public function store(Request $request) 
    {
        $orders = new Orders();

        $orders->first_name = $request->first_name;
        $orders->last_name = $request->last_name;
        $orders->phone_number = $request->phone_number;
        $orders->contact_email = $request->contact_email;
        $orders->shipping_address = $request->shipping_address;
        $orders->city = $request->city;
        $orders->country = $request->country;
        $orders->note = $request->note;
        $orders->payment_method = $request->payment_method;
        $orders->order_items = $request->order_items;
        $orders->total = $request->total;
        $orders->status = $request->status;
        $orders->payment_status = $request->payment_status;
        $orders->fulfillment_status = $request->fulfillment_status;

        $orders->save();

        $return=[
            "success" => "Prder has been create"
        ];
        return response()->json($return);
    }
}
