'use client';
import { getAllProduct } from '@/api/services';
import ProductItem from '@/components/ProductItem';
import React, { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import { headers } from '@/api/axios';
import { SearchBar } from '@/components/SearchBar';
import Transaction from '@/components/Transaction';
import { isLoggedIn } from '../layout';
import { ProductProps } from '@/types';

export default function Product() {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productTransaction, setProductTransaction] = useState(
    JSON.parse(sessionStorage.getItem('product_transaction') || '[]'),
  );
  const [productKeyword, setProductKeyword] = useState('');

  const handleGetProducts = async () => {
    try {
      setIsLoading(true);
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      const res = await getAllProduct();
      setIsLoading(false);
      setProducts(res.data);
    } catch (e: any) {
      setIsLoading(false);
      return;
    }
  };
  useEffect(() => {
    handleGetProducts();
  }, []);

  useEffect(
    () =>
      sessionStorage.setItem(
        'product_transaction',
        JSON.stringify(productTransaction),
      ),
    [productTransaction],
  );

  return (
    <div
      className={`${
        isLoggedIn.value && 'flex'
      } justify-between gap-2 max-lg:flex-col`}
    >
      <div className="flex flex-col gap-8 text-center basis-3/4 border border-black rounded-md">
        <div className="flex justify-center gap-5">
          <SearchBar
            productKeyword={productKeyword}
            setProductKeyword={setProductKeyword}
          />
        </div>
        {isLoading ? (
          <Preloader />
        ) : !products.length ? (
          <div
            className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold text-xl">Information</p>
            <p className="text-xl">Products is Empty</p>
          </div>
        ) : (
          <div className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
            {products.filter((product) =>
              product.name.toLowerCase().includes(productKeyword.toLowerCase()),
            ).length ? (
              <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {products
                  .filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(productKeyword.toLowerCase()),
                  )
                  .map((product, index) => (
                    <div key={index}>
                      <ProductItem
                        product={product}
                        productTransaction={productTransaction}
                        setProductTransaction={setProductTransaction}
                      ></ProductItem>
                    </div>
                  ))}
              </div>
            ) : (
              <div
                className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
                role="alert"
              >
                <p className="font-bold text-xl">Information</p>
                <p className="text-xl">
                  Product with {productKeyword} keyword not found
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {isLoggedIn.value && (
        <Transaction productTransaction={productTransaction} />
      )}
    </div>
  );
}
