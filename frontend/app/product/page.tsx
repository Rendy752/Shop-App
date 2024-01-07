'use client';
import { getProducts } from '@/api/services';
import BookItem from '@/components/BookItem';
import { TBook } from '@/types';
import React, { useEffect, useState } from 'react';
import Detail from './detail';
import Link from 'next/link';
import Preloader from '@/components/Preloader';
import { headers } from '@/api/axios';
import { SearchBar } from '@/components/SearchBar';

export default function Product() {
  const [products, setProducts] = useState<TBook[]>([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [idBook, setIdBook] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetProducts = async () => {
    try {
      setIsLoading(true);
      headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
      const res = await getProducts();
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
  return (
    <div className="flex flex-col gap-8 text-center">
      <div className="flex justify-center gap-5">
        <SearchBar />
      </div>
      {isLoading && <Preloader></Preloader>}
      {!products.length ? (
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="font-bold text-xl">Information</p>
          <p className="text-xl">Products is Empty</p>
        </div>
      ) : (
        <div className="bg-gray-100 dark:bg-gray-900 py-10 px-12">
          <div className="grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((book, index) => (
              <div key={index}>
                <BookItem
                  book={book}
                  setIdBook={setIdBook}
                  setShowDetailModal={setShowDetailModal}
                ></BookItem>
              </div>
            ))}
          </div>
        </div>
      )}
      {showDetailModal && (
        <Detail
          idBook={idBook}
          setShowDetailModal={setShowDetailModal}
          handleGetProducts={handleGetProducts}
        ></Detail>
      )}
    </div>
  );
}
