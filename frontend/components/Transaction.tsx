import { ProductTransactionProps } from '@/types';
import React, { useState } from 'react';
import Button from './Button';
import { addTransaction } from '@/api/services';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Preloader from './Preloader';
import { Errors } from './Errors';

interface ProductTransactionItemProps {
  productTransaction: ProductTransactionProps[];
}

const Transaction = ({ productTransaction }: ProductTransactionItemProps) => {
  const router = useRouter();
  console.log(productTransaction);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const totalCost = productTransaction.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    0,
  );

  const handleAddTransaction = async () => {
    try {
      setIsLoading(true);
      const tes = await addTransaction(productTransaction, totalCost);
      console.log(tes);
      setError('');
      setIsLoading(false);
      toast.success('Transaction Success');
      router.replace('/transaction');
    } catch (e: any) {
      console.log(e);
      setIsLoading(false);
      setError(e);
    }
  };
  return (
    <div className="bg-gray-800 w-full basis-1/4 text-white">
      <div className="py-3 text-center font-extrabold">Transaction</div>
      <hr />

      {!productTransaction.length ? (
        <div className="p-3">Transaction Empty</div>
      ) : (
        productTransaction.map(
          (item, index) =>
            item.amount !== 0 && (
              <div className="p-3 flex justify-between" key={index}>
                <span>
                  {item.name} X {item.amount}
                </span>
                <span>{item.price * item.amount}</span>
              </div>
            ),
        )
      )}
      <div className="bg-gray-200 px-3 py-5 mt-5 text-black font-extrabold flex justify-between">
        <span>Total</span>
        <span>
          Rp.
          {totalCost}
        </span>
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
          style="mt-5 me-5 float-right bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-700"
          handleClick={handleAddTransaction}
        />
      )}
    </div>
  );
};

export default Transaction;
