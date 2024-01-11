<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class voucher extends Model
{
    use HasFactory, HasUuids;
    protected $fillable = ['code', 'transaction_id', 'transaction_used_id', 'expired_at'];
    public function transaction()
    {
        return $this->belongsTo(transaction::class, 'transaction_id', 'transaction_used_id');
    }
}