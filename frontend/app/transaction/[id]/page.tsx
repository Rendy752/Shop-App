'use client';
import { getDetailTransaction } from '@/api/services';
import { Errors } from '@/components/Errors';
import Preloader from '@/components/Preloader';
import { ReceiptProps } from '@/types';
import {
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const TransactionDetail = ({ params }: { params: { id: number } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [error, setError] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [receipt, setReceipt] = useState<ReceiptProps>({
    message: '',
    transaction_id: 0,
    transaction_date: new Date(),
    transaction_total: 0,
    transaction_detail: [],
    voucher_use: [],
    voucher_get: [],
  });
  useEffect(() => {
    const fetchReceipt = async () => {
      setHydrated(true);
      try {
        setIsLoading(true);
        const res = await getDetailTransaction(params.id);
        setReceipt(res);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        setError(e);
      }
    };
    fetchReceipt();
  }, []);
  return (
    <div className="relative w-auto my-6 mx-auto max-w-3xl">
      {error && <Errors message={error} />}
      {/*content*/}
      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        {/*body*/}
        <div className="relative p-6 flex-auto">
          <div className="flex justify-between font-bold mb-5">
            <div>ShopApp</div>
            <div>Receipt</div>
          </div>
          {isLoading ? (
            <Preloader />
          ) : (
            <div className="">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                  <div>Id: {receipt.transaction_id}</div>
                  <div>
                    Date:{' '}
                    {hydrated
                      ? receipt.transaction_date.toLocaleString().slice(0, 10)
                      : receipt.transaction_date.toUTCString().slice(0, 10)}
                  </div>
                </div>
                <div className="flex justify-between">
                  <div>Total product: {receipt.transaction_detail.length}</div>
                  <div>
                    Time:{' '}
                    {hydrated
                      ? receipt.transaction_date.toLocaleString().slice(11, 19)
                      : receipt.transaction_date.toUTCString().slice(11, 19)}
                  </div>
                </div>
              </div>
              <hr className="my-3" />
              <div className="">
                {receipt.transaction_detail.map((product) => (
                  <div className="flex justify-between" key={product.id}>
                    <div>
                      {product.product_name} ({product.total} &times; Rp.
                      {Math.round(product.product_price).toLocaleString()}
                      ,-)
                    </div>
                    <div>
                      Rp.
                      {(product.total * product.product_price).toLocaleString()}
                      ,-
                    </div>
                  </div>
                ))}
              </div>
              <hr className="my-3" />
              <div className="flex flex-col gap-3">
                <div className="flex justify-between font-bold">
                  <div>Sub Total</div>
                  <div>
                    Rp.
                    {receipt.transaction_detail
                      .reduce(
                        (previousTotal, currentTotal) =>
                          previousTotal +
                          currentTotal.product_price * currentTotal.total,
                        0,
                      )
                      .toLocaleString()}
                    ,-
                  </div>
                </div>
                <div className="flex justify-between font-bold">
                  <div>Discount</div>
                  <div>
                    {receipt.voucher_use.length !== 0
                      ? 'Rp.10,000,-'
                      : 'Rp.0,-'}
                  </div>
                </div>
                <div className="flex justify-between font-bold">
                  <div>Total</div>
                  <div>
                    Rp.
                    {Math.round(receipt.transaction_total).toLocaleString()}
                    ,-
                  </div>
                </div>
                {receipt.voucher_get.length !== 0 && (
                  <div className="bg-yellow-50 rounded-xl p-3 text-center">
                    <div>Congrats, you receive voucher</div>
                    <div className="font-semibold">
                      {receipt.voucher_get.map((item) => (
                        <div
                          className="flex justify-center gap-3"
                          key={item.id}
                        >
                          <div>{item.code}</div>
                          {isCopy ? (
                            <ClipboardDocumentCheckIcon className="w-7 h-7 text-green-500" />
                          ) : (
                            <ClipboardDocumentIcon
                              className="w-7 h-7 text-blue-500 hover:text-blue-700 cursor-pointer"
                              onClick={() => {
                                navigator.clipboard.writeText(item.code);
                                toast.success(
                                  'Succesfully Copied Voucher Code',
                                );
                                setIsCopy(true);
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <hr className="my-3" />
              <div className="text-center">-- Thanks For Shopping --</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
