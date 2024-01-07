import { deleteSpesificBook } from '@/api/services';
import { IError } from '@/types';
import { XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/16/solid';
import React, { useState } from 'react';
import Preloader from './Preloader';
import { Errors } from './Errors';
import toast from 'react-hot-toast';

interface TProps {
  idBook: number;
  title: string;
  setShowDeleteConfirmation: Function;
  setShowDetailModal: Function;
  handleGetBooks: Function;
}

export default function DeleteConfirmation({
  idBook,
  title,
  setShowDeleteConfirmation,
  setShowDetailModal,
  handleGetBooks,
}: TProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError>({ message: '' });

  const handleDeleteBook = async () => {
    try {
      setIsLoading(true);
      await deleteSpesificBook(idBook);
      setIsLoading(false);
      setError((prev) => ({ ...prev, message: '' }));
      setShowDeleteConfirmation(false);
      setShowDetailModal(false);
      handleGetBooks();
      toast.success('Book Successfully Deleted');
    } catch (e: any) {
      setIsLoading(false);
      setError((prev) => ({ ...prev, message: e }));
    }
  };
  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-md px-5 py-4 relative">
        <button
          className="rounded-lg p-1 transition-all hover:bg-gray-200 float-end"
          onClick={() => setShowDeleteConfirmation(false)}
        >
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
        <div className="my-8 text-center flex justify-evenly">
          <ExclamationTriangleIcon
            className="h-12 w-12 text-red-500 text-center"
            aria-hidden="true"
          />
          <h4 className="text-base font-semibold mt-4">
            Are you sure you want to delete &quot;{title}&quot; ?
          </h4>
        </div>
        <div className="text-right space-x-4"></div>
        <div className="flex flex-col space-y-4">
          {error.message && (
            <div className="mb-4">
              <Errors error={error.message}></Errors>
            </div>
          )}
          {isLoading && <Preloader></Preloader>}
          <button
            onClick={() => handleDeleteBook()}
            type="button"
            className="px-6 py-2 rounded text-white text-sm font-semibold border-none outline-none bg-red-500 hover:bg-red-600 active:bg-red-500"
          >
            Delete
          </button>
          <button
            onClick={() => setShowDeleteConfirmation(false)}
            type="button"
            className="px-6 py-2 rounded text-black text-sm font-semibold border-none outline-none bg-gray-200 hover:bg-gray-300 active:bg-gray-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
