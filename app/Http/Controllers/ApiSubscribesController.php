<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscribe;
use Illuminate\Support\Facades\Validator;

class ApiSubscribesController extends Controller
{
    public function index()
    {
        $result = Subscribe::orderBy('id', 'desc')->get();
        
        return response()->json($result, 201);
    }

    public function store(Request $request) 
    {
        $subscribe = new Subscribe();

        $rules=array(
            'email' => 'required|email|unique:subscribes,email',
        );
        $messages=array(
                'email.required' => 'Please enter a email.',
                'email.unique' => 'Email is exist.',
                'email.email' => 'Please enter email corect.'
            );
        $validator=Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            $messages=$validator->messages();
            $return=[
                "error" => "There was an error add!",
                "error_detail" => $validator->errors()
            ];
            return response()->json($return);
        } 
        else {
            $subscribe->email = $request->email;
            $subscribe->name = "Customer";

            $subscribe->save();

            $return=[
                "success" => "You are subscribed"
            ];
            return response()->json($return);
        }
    }

    function delete($id)
    {
        $email = Subscribe::find($id);

        $email->delete();
    }
}
