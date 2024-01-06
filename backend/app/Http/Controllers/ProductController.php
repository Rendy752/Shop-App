<?php

namespace App\Http\Controllers;

use App\Models\product;
use Illuminate\Http\Request;
use Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json(['message' => 'All Product Founded', 'data' => $products], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'price' => 'required | numeric | min:1000',
            'stock' => 'required | numeric | min:0',
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Request Body Error',
                'error' => $validator->errors()
            ], 422);

        $product = Product::create([
            'user_id' => auth()->user()->id,
            'name' => $request->name,
            'price' => $request->price,
            'stock' => $request->stock
        ]);

        return response()->json([
            'message' => 'Product Successfully Added',
            'data' => $product
        ], 200);
    }
}