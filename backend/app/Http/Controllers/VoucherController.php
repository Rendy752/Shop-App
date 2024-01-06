<?php

namespace App\Http\Controllers;

use App\Models\voucher;
use Illuminate\Http\Request;
use Validator;

class VoucherController extends Controller
{
    public function index()
    {
        $vouchers = voucher::where('user_id', auth()->user()->id)->get();
        return response()->json(['message' => 'All Voucher Founded', 'data' => $vouchers], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'total' => 'required',
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Request Body Error',
                'error' => $validator->errors()
            ], 422);

        $voucher = Voucher::create([
            'code' => '',
            'user_id' => auth()->user()->id,
            'expired_at' => now()->addMonths(3),
        ]);

        return response()->json([
            'message' => 'Voucher Successfully Added',
            'data' => $voucher
        ], 200);
    }

    public function show($id)
    {
        $voucher = Voucher::find($id);
        if (empty($voucher)) {
            return response()->json([
                'message' => 'Voucher Not Found',
            ], 404);
        } else {
            return $voucher->user_id === auth()->user()->id ?
                response()->json([
                    'message' => 'Voucher Successfully Founded',
                    'data' => $voucher
                ], 200) : response()->json([
                            'message' => 'Access Forbidden',
                        ], 403);
        }
    }
}