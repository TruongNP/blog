<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use Illuminate\Support\Str;

class ApiProductsController extends Controller
{
    public function index()
    {
        $products = new Products();

        $response = $products->all();

        return response()->json($response);
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
        $products->tags = $request->tags;
        $products->product_type = $request->product_type;
        $products->vendor = $request->vendor;
        $products->collection = $request->collection;
        $products->media = $path_image;
        $products->variants = 'color';
        $products->status = 'Instock';

        $products->save();

        return response()->json('status', 201);
    }
}
