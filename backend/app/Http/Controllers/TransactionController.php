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
        return response()->json(['message' => 'All Transaction Founded', 'transaction' => $transactions], 200);
    }

    public function store(Request $request)
    {
        try {
            $transactionData = array(
                'product_transaction' => $request->product_transaction,
                'total_cost' => $request->total_cost,
            );
            // dd($transactionData['product_transaction']);

            if (empty($transactionData['product_transaction']))
                return response()->json([
                    'message' => 'Transaction Empty, Cannot Buy',
                ], 422);

            $transaction = Transaction::create([
                'user_id' => auth()->user()->id,
                'total' => $request->total_cost
            ]);
            $transactionId = transaction::latest()->first()->id;

            $transactionData = $request->all();
            $voucher = null;
            if ($transactionData['total_cost'] >= 2000000) {
                $voucher = voucher::create([
                    'code' => Str::random(18),
                    'transaction_id' => $transactionId,
                    'expired_at' => now()->addMonths(3),
                ]);
            }
            foreach ($transactionData['product_transaction'] as $item) {
                $selectedProduct = product::find($item['id']);
                $newStock = ($selectedProduct->stock) - $item['amount'];
                $selectedProduct->update(["stock" => $newStock]);
                detail_transaction::create([
                    'transaction_id' => $transactionId,
                    'product_id' => $item['id'],
                    'total' => $item['amount']
                ]);
            }

            return response()->json([
                'message' => 'Transaction Successfully Added',
                'voucher' => $voucher,
                'transaction_id' => $transaction->id,
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
            if ($transaction->user_id === auth()->user()->id) {
                $transactionDetail = detail_transaction::where('transaction_id', $id)->get();
                foreach ($transactionDetail as $item) {
                    $selectedProduct = product::find($item->product_id);
                    $item->product_name = $selectedProduct->name;
                    $item->product_price = $selectedProduct->price;
                }
                $voucher = voucher::where('transaction_id', $id)->get();
                return response()->json([
                    'message' => 'Transaction Successfully Founded',
                    'transaction_id' => $transactionDetail[0]->transaction_id,
                    'transaction_date' => $transactionDetail[0]->updated_at,
                    'transaction_detail' => $transactionDetail,
                    'voucher' => $voucher,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Access Forbidden',
                ], 403);
            }
        }
    }
}