<?php

namespace App\Http\Controllers;

use App\Models\detail_transaction;
use Illuminate\Http\Request;
use Validator;

class DetailTransactionController extends Controller
{
    public function index()
    {
        $detailTransactions = detail_transaction::where('user_id', auth()->user()->id)->get();
        return response()->json(['message' => 'All Detail Transaction Founded', 'data' => $detailTransactions], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'total' => 'required | numeric',
        ]);

        if ($validator->fails())
            return response()->json([
                'message' => 'Request Body Error',
                'error' => $validator->errors()
            ], 422);

        $transaction = detail_transaction::create([
            'user_id' => auth()->user()->id,
            'total' => $request->total
        ]);

        return response()->json([
            'message' => 'Transaction Successfully Added',
            'data' => $transaction
        ], 200);
    }

    public function show($id)
    {
        $transaction = detail_transaction::find($id);
        if (empty($transaction)) {
            return response()->json([
                'message' => 'Transaction Not Found',
            ], 404);
        } else {
            return $transaction->user_id === auth()->user()->id ?
                response()->json([
                    'message' => 'Transaction Successfully Founded',
                    'data' => $transaction
                ], 200) : response()->json([
                            'message' => 'Access Forbidden',
                        ], 403);
        }
    }
}