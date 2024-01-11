<?php

namespace App\Http\Controllers;

use App\Models\detail_transaction;
use App\Models\product;
use App\Models\transaction;
use App\Models\voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
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
                'voucher_code' => $request->voucher_code,
            );
            // dd($transactionData['voucher_code']);

            $isVoucherValid = voucher::join('transactions', 'transactions.id', '=', 'vouchers.transaction_id')->where('transactions.user_id', auth()->user()->id)->where('vouchers.code', $transactionData['voucher_code'])->whereDate('vouchers.expired_at', '>=', Carbon::today())->get()->count();
            // dd($isVoucherValid);
            if (empty($transactionData['product_transaction']))
                return response()->json([
                    'message' => 'Transaction Empty, Cannot Buy',
                ], 422);

            $transaction = Transaction::create([
                'user_id' => auth()->user()->id,
                'total' => $isVoucherValid ? ($request->total_cost) - 10000 : $request->total_cost,
            ]);
            $transactionId = transaction::latest()->first()->id;

            $transactionData = $request->all();
            $voucher = null;

            if ($isVoucherValid) {
                voucher::where('code', $transactionData['voucher_code'])->update(['transaction_used_id' => $transactionId]);
            }

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
                $voucherGet = voucher::where('transaction_id', $id)->get();
                $voucherUse = voucher::where('transaction_used_id', $id)->get();
                return response()->json([
                    'message' => 'Transaction Successfully Founded',
                    'transaction_id' => $transactionDetail[0]->transaction_id,
                    'transaction_date' => $transactionDetail[0]->updated_at,
                    'transaction_total' => $transaction->total,
                    'transaction_detail' => $transactionDetail,
                    'voucher_use' => $voucherUse,
                    'voucher_get' => $voucherGet,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'Access Forbidden',
                ], 403);
            }
        }
    }
}