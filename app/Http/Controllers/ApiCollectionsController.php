<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Collections;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\Media;

class ApiCollectionsController extends Controller
{
    public function index()
    {
        $result = Collections::orderBy('id', 'desc')->get();
        
        return response()->json($result, 201);
    }

    function getCollectionById($id)
    {
        $collection = Collections::find($id);

        return response()->json($collection, 201);
    }

    public function store(Request $request) 
    {
        $collection = new Collections();

        $rules=array(
            'title' => 'required',
        );
        $messages=array(
                'title.required' => 'Please enter a collection title.',
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
            $collection->title = $request->title;
            $collection->slug = Str::slug($request->title, '-');;
            $collection->description = $request->description;
            $collection->status = $request->status;

            $collection->save();

            $return=[
                "success" => "Collection has been create"
            ];
            return response()->json($return);
        }
    }

    public function update(Request $request) 
    {
        $collection = Collections::find($request->id);

        $rules=array(
            'title' => 'required',
        );
        $messages=array(
                'title.required' => 'Please enter a collection title.',
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
            $collection->title = $request->title;
            $collection->slug = Str::slug($request->title, '-');;
            $collection->description = $request->description;
            $collection->status = $request->status;

            $collection->save();

            $return=[
                "success" => "Collection has been updated"
            ];
            return response()->json($return);
        }
    }

    function delete($id)
    {
        $collection = Collections::find($id);

        $collection->delete();
    }
}
