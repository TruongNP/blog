<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use Illuminate\Support\Str;

class UploadFileController extends Controller
{
    public function index()
    {
        $data = [
            'name' => 'truong Npt'
        ];

        return response()->json($data, 201);
    }

    public function store(Request $request)
    {
        $products = new Products();

        $path = base_path('public/uploads/asset');

        $file = $request->file('file');
        $file_name = $file->getClientOriginalName() ;

        $file->move( $path, $file_name);
        $path_image =  '/uploads/asset/'.$file_name.'';

        $products->title = $request->title;
        $products->slugs = Str::slug($request->title, '-');
        $products->description = $request->description;
        $products->feature_image = $path_image;
        $products->tags = 'color';
        $products->product_type = 'admin';
        $products->vendor = 'admin';
        $products->collection = 'admin';
        $products->media = $path_image;
        $products->variants = 'color';
        $products->status = 'Instork';

        $products->save();

        return response()->json('status', 201);
    }

    public function update(Request $request)
    {
        $article->update($request->all());

        return response()->json($article, 200);
    }

    public function delete(Article $article)
    {
        $article->delete();

        return response()->json(null, 204);
    }
}
