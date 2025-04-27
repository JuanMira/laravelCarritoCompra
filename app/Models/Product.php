<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'stock',
        'provider_name',
        'provider_phone',
        'provider_address',
    ];

    public function sales()
    {
        return $this->belongsToMany(Sale::class, 'sale_products')
                    ->withPivot('quantity', 'price_at_sale')
                    ->withTimestamps();
    }
}
