<?php

namespace App\Http\Controllers;

use App\Models\detail_transaction;
use App\Models\product;
use App\Models\transaction;
use App\Models\voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = transaction::where('user_id', auth()->user()->id)->get();
        return response()->json(['message' => 'All Transaction Founded', 'data' => $transactions], 200);
    }

    public function store(Request $request)
    {
        try {
            $transactionData = array(
                'product_transaction' => $request->product_transaction,
                'total_cost' => $request->total_cost,
            );
            // dd($transactionData['product_transaction']);
            $transactionData = $request->all();
            if ($transactionData['total_cost'] >= 2000000) {
                $voucher = voucher::create([
                    'code' => Str::random(18),
                    'user_id' => auth()->user()->id,
                    'expired_at' => now()->addMonths(3),
                ]);
            }

            $transaction = Transaction::create([
                'user_id' => auth()->user()->id,
                'total' => $request->total_cost
            ]);

            $transactionId = transaction::latest()->first()->id;
            foreach ($transactionData['product_transaction'] as $item) {
                $selectedProduct = product::find($item['id']);
                $newStock = ($selectedProduct->stock) - $item['amount'];
                $selectedProduct->update(["stock" => $newStock]);
                $detailTransaction = detail_transaction::create([
                    'transaction_id' => $transactionId,
                    'product_id' => $item['id'],
                    'total' => $item['amount']
                ]);
            }

            return response()->json([
                'message' => 'Transaction Successfully Added',
                'voucher' => $voucher,
                'transaction' => $transaction,
                'detail_transaction' => $detailTransaction,
            ], 200);

        } catch (e) {
            return response()->json([
                'message' => 'Transaction Failed',
            ], 401);
        }
    }

    public function show($id)
    {
        $transaction = Transaction::find($id);
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