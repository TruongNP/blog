<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscribe;

class ApiSubscribesController extends Controller
{
    public function index()
    {
        $result = Subscribe::orderBy('id', 'desc')->get();
        
        return response()->json($result, 201);
    }

    function delete($id)
    {
        $email = Subscribe::find($id);

        $email->delete();
    }
}
