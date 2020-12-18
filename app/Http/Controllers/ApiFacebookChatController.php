<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FacebookChat;

class ApiFacebookChatController extends Controller
{
    public function index()
    {
        $result = FacebookChat::all();
        
        return response()->json($result, 201);
    }

    public function store(Request $request) 
    {
        $facebook_chat = new FacebookChat();

        $facebook_chat->script = $request->script;

        $facebook_chat->save();

        $return=[
            "success" => "Script has been save"
        ];
        return response()->json($return);
    }

    public function update(Request $request) 
    {
        $facebook_chat = FacebookChat::find($request->id);;

        $facebook_chat->script = $request->script;

        $facebook_chat->save();

        $return=[
            "success" => "Script has been save"
        ];
        return response()->json($return);
    }
}
