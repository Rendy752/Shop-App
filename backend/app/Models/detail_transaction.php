<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class detail_transaction extends Model
{
    use HasFactory;
    protected $fillable = ['transaction_id', 'product_id', 'total'];
    public function transaction()
    {
        return $this->belongsTo(transaction::class, 'transaction_id');
    }

    public function product()
    {
        return $this->belongsTo(product::class, 'product_id');
    }
}