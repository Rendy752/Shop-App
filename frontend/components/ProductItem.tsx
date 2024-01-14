import { ProductProps } from '@/types';
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { timeAgo } from '@/api/services';
import { ClockIcon, CurrencyDollarIcon } from '@heroicons/react/16/solid';
import toast from 'react-hot-toast';
import { isLoggedIn } from '@/app/layout';

interface ProductItemProps {
  product: ProductProps;
  productTransaction: any;
  handleClick: Function;
}

export default function ProductItem({
  product,
  productTransaction,
  handleClick,
}: ProductItemProps) {
  const [number, setNumber] = useState(
    productTransaction
      .filter((item: any) => item.id === product.id)
      .map((item: any) => item.amount)[0] ?? 0,
  );
  const handleReduce = () => {
    if (number - 1 < 0) {
      setNumber(0);
      toast.error('Product purchase amount cannot be negative');
    } else {
      setNumber(
        (productTransaction
          .filter((item: any) => item.id === product.id)
          .map((item: any) => item.amount)[0] ?? 0) - 1,
      );
    }
  };
  const handleIncrease = () => {
    if (number + 1 > product.stock) {
      setNumber(product.stock);
      toast.error(
        `${product.name} purchase amount cannot exceed ${product.stock}`,
      );
    } else {
      setNumber(
        (productTransaction
          .filter((item: any) => item.id === product.id)
          .map((item: any) => item.amount)[0] ?? 0) + 1,
      );
    }
  };

  useEffect(() => {
    var isSameItem = false;
    const newState = productTransaction.map((item: any) => {
      if (item.name === product.name) {
        isSameItem = true;
        return {
          ...item,
          id: product.id,
          price: product.price,
          amount: number,
        };
      }

      return item;
    });
    handleClick(newState);
    if (!isSameItem)
      handleClick((prev: any) => [
        ...prev,
        {
          name: product.name,
          id: product.id,
          price: product.price,
          amount: number,
        },
      ]);
  }, [number]);
  return (
    <div className="animate-show my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-gray-600 text-white dark:bg-gray-800 duration-300 hover:-translate-y-3 hover:bg-gray-800 hover:rounded-3xl">
      <div className="cursor-pointer">
        <figure>
          <figcaption className="p-4 flex flex-col gap-2">
            <p className="text-lg mb-4 font-bold leading-relaxed capitalize">
              {product.name}
            </p>
            <hr />
            <p className="text-lg mb-4 font-bold leading-relaxed flex justify-center gap-3">
              <ClockIcon className="h-6 w-6" />
              {timeAgo(product.updated_at)}
            </p>
            <p className="text-lg mb-4 font-bold leading-relaxed flex justify-center gap-3">
              <CurrencyDollarIcon className="h-6 w-6" />
              Rp.{product.price}
            </p>
            <p className="text-lg mb-4 font-bold leading-relaxed">
              {product.stock}
            </p>
            {isLoggedIn.value && (
              <div className="flex justify-center gap-4">
                <Button
                  title="-"
                  style="bg-red-500 py-2 px-4 rounded-md hover:bg-red-700"
                  handleClick={handleReduce}
                ></Button>
                <span className="bg-white py-2 px-4 rounded-md hover:bg-gray-300 text-black font-bold">
                  {productTransaction
                    .filter((item: any) => item.id === product.id)
                    .map((item: any) => item.amount)[0] ?? 0}
                </span>
                <Button
                  title="+"
                  style="bg-green-500 py-2 px-4 rounded-md hover:bg-green-700"
                  handleClick={handleIncrease}
                ></Button>
              </div>
            )}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
