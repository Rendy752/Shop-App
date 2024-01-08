'use client';
import { getAllTransaction } from '@/api/services';
import React, { useEffect, useState } from 'react';

const Transaction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        setIsLoading(true);
        const res = await getAllTransaction();
        setIsLoading(false);
        console.log(res);
      } catch (e: any) {
        setIsLoading(false);
        setError(e);
      }
    };
  }, []);
  return <div>Transaction</div>;
};

export default Transaction;
