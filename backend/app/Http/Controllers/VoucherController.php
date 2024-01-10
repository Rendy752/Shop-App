<?php

namespace App\Http\Controllers;

use App\Models\voucher;

class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = voucher::join('transactions', 'transactions.id', '=', 'vouchers.transaction_id')->where('transactions.user_id', auth()->user()->id)->get();
        return response()->json(['message' => 'All Voucher Founded', 'data' => $vouchers], 200);
    }
}