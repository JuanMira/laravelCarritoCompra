<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sale;
use App\Models\Product;
use App\Models\SaleProduct;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    public function index(){
        $sales = auth()->user()->sales()
            ->with('products')
            ->orderBy('sale_date', 'desc')
            ->get();

        return response()->json([
            'sales' => $sales
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'products' => 'required|array|min:1',
            'products.*.product.id' => 'required|exists:products,id',
            'products.*.quantity' => 'required|integer|min:1'
        ]);

        try {
            DB::beginTransaction();

            $total = collect($validated['products'])->reduce(function ($carry, $item) {
                $product = Product::findOrFail($item['product']['id']);
                return $carry + ($product->price * $item['quantity']);
            }, 0);

            $sale = Sale::create([
                'user_id' => auth()->id(),
                'total' => $total,
                'sale_date' => now()
            ]);

            foreach($validated['products'] as $item) {
                $product = Product::findOrFail($item['product']['id']);
                SaleProduct::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'price_at_sale' => $product->price
                ]);

                $product = Product::find($item['product']['id']);

                if ($product->stock < $item['quantity']) {
                    throw new \Exception("No hay suficiente stock para el producto {$product->name}");
                }

                $product->decrement('stock', $item['quantity']);
            }

            DB::commit();

            return response()->json([
                'message'=>'Venta realizada correctamente',
                'sale' => $sale
            ], 201);

        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Hubo un error al procesar la venta',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
