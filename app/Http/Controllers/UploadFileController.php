<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Media;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class UploadFileController extends Controller
{
    public function index()
    {
        $result = Media::all();
        
        return response()->json($result, 201);
    }

    public function store(Request $request)
    {
        $media = new Media();
        $all_media = $media->all();
        $exist_file = false;

        $path = base_path('public/uploads/asset');

        $file = $request->file('file');
        $file_name = $file->getClientOriginalName();

        $path_image =  '/uploads/asset/'.$file_name.'';
        $alt = explode('.', $file_name);

        $media->file_name = $file_name;
        $media->src = $path_image;
        $media->size = $request->size;
        $media->type = $request->type;
        $media->alt = $alt[0];

        foreach ($all_media as $item) {
            if($item->src == $path_image) {
                $exist_file = true;
                break;
            }
        }

        if($exist_file == false) {
            $file->move( $path, $file_name);
            $media->save();
        }

        $result = [
            'src' => $path_image
        ];

        return response()->json($result);
    }

    public function update(Request $request)
    {
        $article->update($request->all());

        return response()->json($article, 200);
    }

    function delete($id)
    {
        $media = Media::find($id);
        
        $media->delete();
    }
}
