import { getDetailTransaction } from '@/api/services';
import { ReceiptProps, TransactionModalProps } from '@/types';
import {
  XMarkIcon,
  ClipboardDocumentIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import { Errors } from './Errors';
import Preloader from './Preloader';
import toast from 'react-hot-toast';

const TransactionModal = ({
  setShowModal,
  selectedTransactionId,
}: TransactionModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const [error, setError] = useState('');
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
      try {
        setIsLoading(true);
        const res = await getDetailTransaction(selectedTransactionId);
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
    <>
      <div className="justify-center items-center block overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        {error && <Errors message={error} />}
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Receipt</h3>
              <button className="rounded-lg p-1 transition-all hover:bg-gray-200">
                <XMarkIcon
                  className="block h-6 w-6"
                  aria-hidden="true"
                  onClick={() => setShowModal(false)}
                />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              {isLoading ? (
                <Preloader />
              ) : (
                <div className="">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <div>Id: {receipt.transaction_id}</div>
                      <div>
                        Date:{' '}
                        {receipt.transaction_date.toLocaleString().slice(0, 10)}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        Total product: {receipt.transaction_detail.length}
                      </div>
                      <div>
                        Time:{' '}
                        {receipt.transaction_date
                          .toLocaleString()
                          .slice(11, 19)}
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
                          {(
                            product.total * product.product_price
                          ).toLocaleString()}
                          ,-
                        </div>
                      </div>
                    ))}
                  </div>
                  <hr className="my-3" />
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between font-bold">
                      <div>Total</div>
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
                      <div className="bg-yellow-50 rounded-xl p-3">
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
            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
              <div>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-slate-300 rounded shadow hover:shadow-lg"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default TransactionModal;
