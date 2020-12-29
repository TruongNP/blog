<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Discounts;
use Illuminate\Support\Facades\Validator;

class ApiDiscountsController extends Controller
{
    public function index()
    {
        $result = Discounts::orderBy('id', 'desc')->get();
        
        return response()->json($result, 201);
    }

    function getDiscountById($id)
    {
        $discounts = Discounts::find($id);

        return response()->json($discounts, 201);
    }

    public function store(Request $request) 
    {
        $discounts = new Discounts();

        $rules=array(
            'title' => 'required',
            'product_tags' => 'required',
            'product_price' => 'required',
            'discount_value' => 'required'
        );
        $messages=array(
                'title.required' => 'Please enter a discount title.',
                'product_tags.required' => 'Please enter a product tag.',
                'product_price.required' => 'Please enter a price.',
                'discount_value.required' => 'Please enter a discount value.',
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
            $discounts->title = $request->title;
            $discounts->product_tags = $request->product_tags;
            $discounts->product_price = $request->product_price;
            $discounts->discount_value = $request->discount_value;
            $discounts->status = $request->status;

            $discounts->save();

            $return=[
                "success" => "Discount has been create"
            ];
            return response()->json($return);
        }
    }

    public function update(Request $request) 
    {
        $discounts = Discounts::find($request->id);

        $rules=array(
            'title' => 'required',
            'product_tags' => 'required',
            'product_price' => 'required',
            'discount_value' => 'required'
        );
        $messages=array(
                'title.required' => 'Please enter a discount title.',
                'product_tags.required' => 'Please enter a product tag.',
                'product_price.required' => 'Please enter a price.',
                'discount_value.required' => 'Please enter a discount value.',
            );
        $validator=Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            $messages=$validator->messages();
            $return=[
                "error" => "There was an error update!",
                "error_detail" => $validator->errors()
            ];
            return response()->json($return);
        } 
        else {
            $discounts->title = $request->title;
            $discounts->product_tags = $request->product_tags;
            $discounts->product_price = $request->product_price;
            $discounts->discount_value = $request->discount_value;
            $discounts->status = $request->status;

            $discounts->save();

            $return=[
                "success" => "Discount has been update"
            ];
            return response()->json($return);
        }
    }

    public function delete($id)
    {
        $discount = Discounts::find($id);

        $discount->delete();
    }
}
