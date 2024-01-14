import { ProductTransactionProps, VoucherProps } from '@/types';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { addTransaction, getVoucher } from '@/api/services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Preloader from './Preloader';
import { Errors } from './Errors';
import { selectedVoucherCode } from './VoucherItem';

interface ProductTransactionItemProps {
  productTransaction: ProductTransactionProps[];
}

const Transaction = ({ productTransaction }: ProductTransactionItemProps) => {
  const router = useRouter();
  productTransaction = productTransaction.filter(
    (productTransaction) => productTransaction.amount != 0,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [voucher, setVoucher] = useState<VoucherProps[]>([]);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [voucherCode, setVoucherCode] = useState(selectedVoucherCode.value);
  const totalCost = productTransaction.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    0,
  );

  const handleAddTransaction = async () => {
    try {
      setIsLoading(true);
      const res = await addTransaction(
        productTransaction,
        totalCost,
        voucherCode,
      );
      setError('');
      setIsLoading(false);
      toast.success('Transaction Success');
      sessionStorage.removeItem('product_transaction');
      if (res.voucher) toast.success('Congrats, you receive 10k voucher');
      router.replace(`/transaction/${res.transaction_id}`);
    } catch (e: any) {
      setIsLoading(false);
      setError(e);
    }
  };

  const handleCheckVoucher = async () => {
    setIsLoading(true);
    try {
      var isFound = false;
      if (!voucherCode) {
        toast.error('Code is empty');
      } else {
        voucher.some((item) => {
          if (item.code === voucherCode) {
            isFound = true;
            setIsCodeValid(true);
            toast.success('Code is valid');
          }
        });
        if (!isFound) {
          toast.error('Code not valid or already used');
          setIsCodeValid(false);
        }
      }
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleGetVoucher = async () => {
      const res = await getVoucher();
      setVoucher(res.data);
    };
    handleGetVoucher();
  }, []);
  return (
    <div className="bg-gray-800 w-full basis-1/4 text-white rounded-md py-2">
      <div className="py-3 text-center font-extrabold">Transaction</div>
      <hr />

      {!productTransaction.length ? (
        <div className="p-3 text-red-600 animate-pulse font-extrabold text-center">
          Transaction Empty
        </div>
      ) : (
        productTransaction.map(
          (item, index) =>
            item.amount !== 0 && (
              <div
                className="p-3 flex justify-between animate-show"
                key={index}
              >
                <span>
                  {item.name} X {item.amount}
                </span>
                <span>Rp.{(item.price * item.amount).toLocaleString()},-</span>
              </div>
            ),
        )
      )}
      <div className="bg-gray-200 px-3 py-5 mt-5 text-black font-extrabold flex justify-between">
        <span>Total</span>
        {isCodeValid && totalCost ? (
          <span className="line-through animate-show text-red-500">
            Rp.
            {totalCost.toLocaleString()},-
          </span>
        ) : null}
        <span className="animate-show text-green-500">
          Rp.
          {(isCodeValid && totalCost
            ? totalCost - 10000
            : totalCost
          ).toLocaleString()}
          ,-
        </span>
      </div>
      <div className="flex justify-center mt-3 gap-3 p-2">
        <input
          type="text"
          onChange={(e) => setVoucherCode(e.target.value)}
          placeholder="Enter your voucher code ..."
          className={`p-1 rounded-md text-black font-bold ${
            isCodeValid && 'bg-green-400'
          }`}
          value={voucherCode}
        />
        {!isLoading && (
          <Button
            title="Check"
            style="bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-700"
            handleClick={handleCheckVoucher}
          />
        )}
      </div>
      {error && (
        <div className="mb-4">
          <Errors message={error}></Errors>
        </div>
      )}
      {isLoading ? (
        <Preloader></Preloader>
      ) : (
        <Button
          title="Buy"
          style="mt-5 me-2 float-right bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-700"
          handleClick={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default Transaction;
