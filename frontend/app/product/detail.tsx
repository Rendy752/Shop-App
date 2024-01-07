import { editBook, getSpesificBook } from '@/api/services';
import DeleteConfirmation from '@/components/DeleteConfirmation';
import { Errors } from '@/components/Errors';
import Preloader from '@/components/Preloader';
import { IError } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface TProps {
  idBook: number;
  setShowDetailModal: Function;
  handleGetBooks: Function;
}

export default function Detail({
  idBook,
  setShowDetailModal,
  handleGetBooks,
}: TProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError>({ message: '' });
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
    const handleGetSpesificBook = async () => {
      try {
        setIsLoading(true);
        const res = await getSpesificBook(idBook);
        setIsbn(res.isbn);
        setTitle(res.title);
        setSubtitle(res.subtitle);
        setAuthor(res.author);
        setPublished(res.published);
        setPublisher(res.publisher);
        setPages(res.pages);
        setDescription(res.description);
        setWebsite(res.website);
        setIsLoading(false);
      } catch (e: any) {
        setIsLoading(false);
        setError((prev) => ({ ...prev, message: e }));
      }
    };
    handleGetSpesificBook();
  }, []);

  const handleEnterEdit = (e: any) => {
    if (e.key === 'Enter') handleEditBook();
  };

  const handleEditBook = async () => {
    try {
      setIsLoading(true);
      await editBook(
        idBook,
        isbn,
        title,
        subtitle,
        author,
        published,
        publisher,
        pages,
        description,
        website,
      );
      setError((prev) => ({ ...prev, message: '' }));
      setShowDetailModal(false);
      setIsLoading(false);
      handleGetBooks();
      toast.success('Book Successfully Edited');
    } catch (e: any) {
      setIsLoading(false);
      setError((prev) => ({ ...prev, message: e }));
    }
  };

  return (
    <>
      <div className="justify-center items-center block overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-3xl font-semibold">Book&apos;s Detail</h3>
              <button
                className="rounded-lg p-1 transition-all hover:bg-gray-200"
                onClick={() => setShowDetailModal(false)}
              >
                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <form className="mt-6">
                {error.message && (
                  <div className="mb-4">
                    <Errors error={error.message}></Errors>
                  </div>
                )}
                {isLoading && (
                  <div className="mb-4">
                    <Preloader></Preloader>
                  </div>
                )}
                <div className="mb-4">
                  <label
                    htmlFor="isbn"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Isbn
                  </label>
                  <input
                    id="isbn"
                    value={isbn}
                    onKeyPress={handleEnterEdit}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="title"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onKeyPress={handleEnterEdit}
                    onChange={(e) => setTitle(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="subtitle"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Subtitle
                  </label>
                  <input
                    type="text"
                    id="subtitle"
                    value={subtitle}
                    onKeyPress={handleEnterEdit}
                    onChange={(e) => setSubtitle(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="sm:flex justify-between gap-2">
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="author"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Author
                    </label>
                    <input
                      type="text"
                      id="author"
                      value={author}
                      onKeyPress={handleEnterEdit}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="published"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Published
                    </label>
                    <input
                      type="datetime-local"
                      id="published"
                      value={published}
                      onKeyPress={handleEnterEdit}
                      onChange={(e) => setPublished(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="sm:flex justify-between gap-2">
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="publisher"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Publisher
                    </label>
                    <input
                      type="text"
                      id="publisher"
                      value={publisher}
                      onKeyPress={handleEnterEdit}
                      onChange={(e) => setPublisher(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="mb-2 w-full">
                    <label
                      htmlFor="pages"
                      className="block text-sm font-semibold text-gray-800"
                    >
                      Pages
                    </label>
                    <input
                      type="text"
                      id="pages"
                      value={pages}
                      onKeyPress={handleEnterEdit}
                      onChange={(e) => setPages(e.target.value)}
                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onKeyPress={handleEnterEdit}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none block w-full px-4 py-2 mt-2 h-48 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="website"
                    className="block text-sm font-semibold text-gray-800"
                  >
                    Website
                  </label>
                  <input
                    type="text"
                    id="website"
                    value={website}
                    onKeyPress={handleEnterEdit}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </form>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
              {isLoading ? (
                <Preloader></Preloader>
              ) : (
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowDeleteConfirmation(true)}
                >
                  Delete
                </button>
              )}
              <div>
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-3 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 hover:bg-slate-300 rounded shadow hover:shadow-lg"
                  type="button"
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </button>
                {isLoading ? (
                  <Preloader></Preloader>
                ) : (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => handleEditBook()}
                  >
                    Edit
                  </button>
                )}
                {showDeleteConfirmation && (
                  <DeleteConfirmation
                    idBook={idBook}
                    title={title}
                    setShowDeleteConfirmation={setShowDeleteConfirmation}
                    setShowDetailModal={setShowDetailModal}
                    handleGetBooks={handleGetBooks}
                  ></DeleteConfirmation>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
