<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Swatches;
use Illuminate\Support\Facades\Validator;

class ApiSwatchesController extends Controller
{
    public function index()
    {
        $result = Swatches::orderBy('id', 'desc')->get();
        
        return response()->json($result, 201);
    }

    function getOrderById($id)
    {
        $swatch = Swatches::find($id);

        return response()->json($swatch, 201);
    }

    public function store(Request $request) 
    {
        $swatch = new Swatches();

        $rules=array(
            'color_name' => 'required',
        );
        $messages=array(
                'color_name.required' => 'Please enter a color name.',
            );
        $validator=Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            $messages=$validator->messages();
            $return=[
                "error" => "There was an error updating!",
                "error_detail" => $validator->errors()
            ];
            return response()->json($return);
        } 
        else {
            $swatch->color_name = $request->color_name;
            $swatch->color_image = $request->color_image;
            $swatch->color_code = $request->color_code;

            $swatch->save();

            $return=[
                "success" => "Color has been create"
            ];
            return response()->json($return);
        }

        
    }

    public function update(Request $request) 
    {
        $swatch = Swatches::find($request->id);

        $swatch->color_name = $request->color_name;
        $swatch->color_image = $request->color_image;
        $swatch->color_code = $request->color_code;

        $swatch->save();

        $return=[
            "success" => "Color has been updated"
        ];
        return response()->json($return);
    }
}
