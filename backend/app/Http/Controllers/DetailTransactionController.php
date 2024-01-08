<?php

namespace App\Http\Controllers;

use App\Models\detail_transaction;

class DetailTransactionController extends Controller
{
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