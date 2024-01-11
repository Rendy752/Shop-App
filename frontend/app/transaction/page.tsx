'use client';
import { getAllTransaction } from '@/api/services';
import { Errors } from '@/components/Errors';
import Preloader from '@/components/Preloader';
import TransactionItem from '@/components/TransactionItem';
import TransactionModal from '@/components/TransactionModal';
import { TransactionProps } from '@/types';
import React, { useEffect, useState } from 'react';

const Transaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionProps[]>([]);
  const [selectedTransactionId, setSelectedTransactionId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setIsLoading(true);
        const res = await getAllTransaction();
        setTransactions(res);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        setError(e);
      }
    };
    fetchTransaction();
  }, []);
  return (
    <div className="text-center border border-black rounded-md">
      <div className="font-extrabold py-4">Transaction</div>
      {error && <Errors message={error} />}
      {isLoading ? (
        <Preloader></Preloader>
      ) : !transactions.length ? (
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold text-xl">Information</p>
          <p className="text-xl">Transactions is Empty</p>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
          <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2">
            {transactions.map((transaction, index) => (
              <div key={index}>
                <TransactionItem
                  transaction={transaction}
                  setShowModal={setShowModal}
                  setSelectedTransactionId={setSelectedTransactionId}
                ></TransactionItem>
              </div>
            ))}
          </div>
        </div>
      )}
      {showModal && (
        <TransactionModal
          setShowModal={setShowModal}
          selectedTransactionId={selectedTransactionId}
        />
      )}
    </div>
  );
};

export default Transaction;
