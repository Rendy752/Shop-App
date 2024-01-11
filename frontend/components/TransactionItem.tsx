import { DetailTransactionProps, TransactionProps } from '@/types';
import React, { useEffect, useRef, useState } from 'react';
import {
  DocumentMagnifyingGlassIcon,
  EyeSlashIcon,
  EyeIcon,
  CubeIcon,
} from '@heroicons/react/16/solid';
import { ShoppingBagIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { getDetailTransaction } from '@/api/services';
import Preloader from './Preloader';
import { Errors } from './Errors';
import SkeletonLoader from './SkeletonLoader';

interface TransactionItemProps {
  transaction: TransactionProps;
  setShowModal: Function;
  setSelectedTransactionId: Function;
}

const TransactionItem = ({
  transaction,
  setShowModal,
  setSelectedTransactionId,
}: TransactionItemProps) => {
  const [isactive, setIsActive] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [height, setHeight] = useState('0px');
  const [detailTransaction, setDetailTransaction] = useState<
    DetailTransactionProps[]
  >([]);
  const [voucherUse, setVoucherUse] = useState(0);
  const [voucherGet, setVoucherGet] = useState(0);

  const contentSpace = useRef(null);

  function toggleAccordion() {
    setIsActive((prevState) => !prevState);
    // @ts-ignore
    setHeight(isactive ? '0px' : `${contentSpace.current.scrollHeight}px`);
  }
  var date = new Date(transaction.created_at).toUTCString();

  useEffect(() => {
    const fetchDetailTransaction = async () => {
      try {
        setIsLoading(true);
        const res = await getDetailTransaction(transaction.id);
        setDetailTransaction(res.transaction_detail);
        setVoucherUse(res.voucher_use.length);
        setVoucherGet(res.voucher_get.length);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        setError(e);
      }
    };
    fetchDetailTransaction();
  }, []);
  return (
    <div className="animate-show flex flex-col border border-black rounded-xl p-3 shadow-xl">
      {isloading ? (
        <SkeletonLoader />
      ) : (
        <div>
          <div className="flex gap-5 items-center text-start">
            <ShoppingBagIcon className="h-8 w-8 text-blue-300 max-sm:hidden" />
            <div className="flex max-md:flex-col justify-between w-full items-center gap-3">
              <div className="flex flex-col">
                <span className="">Shopping {transaction.id}</span>
                <span className="">{date.slice(0, -13)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <div className="flex max-lg:flex-col gap-2">
                  {voucherGet != 0 && (
                    <span className="italic bg-yellow-200 p-1 rounded-lg shadow-md font-bold">
                      Get Voucher
                    </span>
                  )}
                  {voucherUse != 0 && (
                    <span className="italic bg-green-200 p-1 rounded-lg shadow-md font-bold">
                      Use 10k Voucher
                    </span>
                  )}
                </div>
                <DocumentMagnifyingGlassIcon
                  className="h-7 w-7 cursor-pointer text-green-500 hover:text-green-700"
                  onClick={() => {
                    setSelectedTransactionId(transaction.id);
                    setShowModal(true);
                  }}
                />
              </div>
            </div>
          </div>
          <hr className="my-2" />
          <div className="flex flex-col gap-3 text-start">
            <div className="flex gap-4">
              <ShoppingCartIcon className="h-8 w-8 text-green-500" />
              <div className="flex justify-between w-full items-center">
                <span className="font-extrabold">
                  {detailTransaction.length} Product
                </span>
                {isactive ? (
                  <EyeIcon
                    className="w-7 h-7 text-green-500 hover:text-green-700 cursor-pointer"
                    onClick={toggleAccordion}
                  />
                ) : (
                  <EyeSlashIcon
                    className="w-7 h-7 text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={toggleAccordion}
                  />
                )}
              </div>
            </div>
            <div>
              <div className="font-medium">Total Price</div>
              <div className="font-extrabold">
                Rp.{Math.round(transaction.total).toLocaleString()},-
              </div>
            </div>
          </div>
          <div
            ref={contentSpace}
            style={{ maxHeight: `${height}` }}
            className="overflow-auto transition-max-height duration-700 ease-in-out"
          >
            {error && <Errors message={error} />}
            {isloading ? (
              <Preloader />
            ) : (
              <div className="py-3 flex flex-col gap-2">
                {detailTransaction.map((item, index) => (
                  <div
                    className={`${
                      index % 2 != 0 ? 'bg-gray-400' : 'bg-gray-200'
                    } flex flex-col gap-2 p-2 rounded-md`}
                    key={item.id}
                  >
                    <div className="text-start font-bold flex gap-3">
                      <CubeIcon
                        className={`w-7 h-7 ${
                          index % 2 != 0 ? 'text-gray-200' : 'text-gray-400'
                        }`}
                      />
                      <span>{item.product_name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>
                        &emsp;&emsp;{item.total} &times; {item.product_price}
                      </span>
                      <span>
                        Rp.{(item.product_price * item.total).toLocaleString()}
                        ,-
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
