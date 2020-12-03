<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Products;
use App\Models\Media;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ApiProductsController extends Controller
{
    public function index()
    {
        $get_data = Products::orderBy('id', 'desc')->get();
        $response = [];

        foreach ($get_data as $result) {
            $mediaResponse = [];
            $collection = explode(',', $result->collection);
            $media = explode(',', $result->media);

            foreach ($media as $m) {
                $mediaResponse[] = Media::where('src', $m)->first();
            }

            $data['id'] = $result->id;
            $data['title'] = $result->title;
            $data['slug'] = $result->slugs;
            $data['description'] = $result->description;
            $data['feature_image'] = $result->feature_image;
            $data['price'] = $result->price;
            $data['tags'] = $result->tags;
            $data['product_type'] = $result->product_type;
            $data['vendor'] = $result->vendor;
            $data['collection'] = $collection;
            $data['media'] = $mediaResponse;
            $data['variants'] = $result->variants;
            $data['status'] = $result->status;
            $data['created_at'] = $result->created_at;
            $data['updated_at'] = $result->updated_at;

            $response[] = $data;
        }

        $results = [
            "products" => $response
        ];

        return response()->json($results);
    }

    public function store(Request $request)
    {
        $rules=array(
            'title' => 'required|min:10',
        );
        $messages=array(
                'title.required' => 'Please enter a title.',
                'title.min' => 'Title must be at most 20 characters.',
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

            $products = new Products();
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

            $products->title = $request->title;
            $products->slugs = Str::slug($request->title, '-');
            $products->description = $request->description;
            $products->feature_image = $path_image;
            $products->tags = $request->tags;
            $products->product_type = $request->product_type;
            $products->vendor = $request->vendor;
            $products->collection = $request->collection;
            $products->media = $request->media;
            $products->price = $request->price;
            $products->compare_price = $request->compare_price;
            $products->product_code = $request->product_code;
            $products->quantity = $request->quantity;
            $products->variants = $request->variants;
            $products->status = 'Instock';

            $products->save();

            $return=[
                "success" => "Product has been saved"
            ];
            return response()->json($return);
        }
    }

    function delete($id)
    {
        $product = Products::find($id);

        $product->delete();
    }

    function getProductById($id)
    {
        $product = Products::find($id);

        return response()->json($product, 201);
    }

    public function update(Request $request)
    {
        $rules=array(
            'title' => 'required|min:10',
        );
        $messages=array(
                'title.required' => 'Please enter a title.',
                'title.min' => 'Title must be at most 20 characters.',
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
            $products = Products::find($request->id);
            $media = new Media();
            $all_media = $media->all();
            $exist_file = false;

            $path = base_path('public/uploads/asset');

            $file = $request->file('file');

            if($file) {
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

                $products->feature_image = $path_image;
            }

            $products->title = $request->title;
            $products->slugs = Str::slug($request->title, '-');
            $products->description = $request->description;
            $products->tags = $request->tags;
            $products->product_type = $request->product_type;
            $products->vendor = $request->vendor;
            $products->collection = $request->collection;
            $products->media = $request->media;
            $products->price = $request->price;
            $products->compare_price = $request->compare_price;
            $products->product_code = $request->product_code;
            $products->quantity = $request->quantity;
            $products->variants = $request->variants;
            $products->status = 'Instock';

            $products->save();

            $return=[
                "success" => "Product has been update"
            ];
            return response()->json($return);
        }
    }
}
