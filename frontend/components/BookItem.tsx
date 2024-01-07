import { TBook } from '@/types';
import React from 'react';

interface TProps {
  book: TBook;
  setIdBook: Function;
  setShowDetailModal: Function;
}

export default function BookItem({
  book,
  setIdBook,
  setShowDetailModal,
}: TProps) {
  return (
    <div className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-gray-600 text-white dark:bg-gray-800 duration-300 hover:-translate-y-3 hover:bg-gray-800 hover:rounded-3xl">
      <div
        onClick={() => {
          setIdBook(book.id);
          setShowDetailModal(true);
        }}
        className="cursor-pointer"
      >
        <figure>
          <figcaption className="p-4 flex flex-col gap-2">
            <p className="text-lg mb-4 font-bold leading-relaxed capitalize">
              {book.title} ({book.published.slice(0, 4)})
              <br />
              by {book.author}
            </p>
            <div className="leading-relaxed text-justify">
              Subtitle
              <hr></hr>
              {book.subtitle}
            </div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
