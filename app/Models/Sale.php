<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Sale extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'total',
        'sale_date'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'sale_products')
            ->withPivot('quantity', 'price_at_sale')
            ->withTimestamps();
    }
}
