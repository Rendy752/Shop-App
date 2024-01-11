<?php

namespace App\Http\Controllers;

use App\Models\voucher;
use Illuminate\Support\Carbon;

class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = voucher::join('transactions', 'transactions.id', '=', 'vouchers.transaction_id')->where('transactions.user_id', auth()->user()->id)->where('vouchers.transaction_used_id', null)->whereDate('vouchers.expired_at', '>=', Carbon::today())->get();
        return response()->json(['message' => 'All Voucher Founded', 'data' => $vouchers], 200);
    }
}