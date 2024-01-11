'use client';
import { getVoucher } from '@/api/services';
import { Errors } from '@/components/Errors';
import Preloader from '@/components/Preloader';
import VoucherItem from '@/components/VoucherItem';
import { VoucherProps } from '@/types';
import React, { useEffect, useState } from 'react';

const Voucher = () => {
  const [voucher, setVoucher] = useState<VoucherProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleGetVoucher = async () => {
    setIsLoading(true);
    try {
      const res = await getVoucher();
      setVoucher(res.data);
    } catch (e: any) {
      setError(e);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleGetVoucher();
  }, []);
  return (
    <div className="text-center border border-black rounded-md">
      <div className="font-extrabold py-4">Vouchers</div>
      {error && <Errors message={error} />}
      {isLoading ? (
        <Preloader></Preloader>
      ) : !voucher.length ? (
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold text-xl">Information</p>
          <p className="text-xl">Voucher is Empty</p>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900 py-10 px-3">
          <div className="font-extrabold pb-4">
            You have {voucher.length} vouchers available
          </div>
          <div className="grid grid-flow-row gap-8 my-3 text-neutral-600 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {voucher.map((item, index) => (
              <div key={index}>
                <VoucherItem voucher={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Voucher;
