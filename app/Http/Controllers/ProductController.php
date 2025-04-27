<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;

class ProductController extends Controller
{
    public function index() 
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function store(Request $request){
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'provider_name' => 'required|string',
            'provider_phone' => 'string',
            'provider_address' => 'required|string'
        ]);

        $product = Product::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'stock' => $validated['stock'],
            'price' => $validated['price'],
            'provider_name' => $validated['provider_name'],
            'provider_phone' => $validated['provider_phone'],
            'provider_address' => $validated['provider_address']
        ]);

        return $product;        
    }

    public function get($id){
        return Product::findOrFail($id);
    }

    public function update(Request $request, $id){
        $product = Product::findOrFail($id);
        $validated = $request->validate([
            'name' => 'required|string',
            'description' => 'string',
            'price' => 'required|numeric',
            'stock' => 'required|numeric',
            'provider_name' => 'required|string',
            'provider_phone' => 'string',
            'provider_address' => 'required|string'
        ]);

        $product->update([
            'name' => $validated['name'] ?? $product->name,
            'description' => $validated['description'] ?? $product->description,
            'price' => $validated['price'] ?? $product->price,
            'stock' => $validated['stock'] ?? $product->stock,
            'provider_name' => $validated['provider_name'] ?? $product->provider_name,
            'provider_phone' => $validated['provider_phone'] ?? $product->provider_phone,
            'provider_address' => $validated['provider_address'] ?? $product->provider_address,
        ]);


        return $product;
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
