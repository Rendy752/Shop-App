import { useState } from 'react';
import Preloader from '@/components/Preloader';
import { Errors } from '@/components/Errors';
import { IError } from '@/types';
import { addBook } from '@/api/services';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Add() {
  const [isbn, setIsbn] = useState('');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [publisher, setPublisher] = useState('');
  const [pages, setPages] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<IError>({ message: '' });
  const router = useRouter();

  const handleAddBook = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await addBook(
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
      setIsLoading(false);
      router.replace('/book');
      toast.success('Book Succesfully Added');
    } catch (e: any) {
      setIsLoading(false);
      setError((prev) => ({ ...prev, message: e }));
    }
  };

  return (
    <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <h1 className="text-3xl font-bold text-center text-gray-700">Add Book</h1>
      <form className="mt-6" onSubmit={handleAddBook}>
        {error.message && (
          <div className="mb-4">
            <Errors error={error.message}></Errors>
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
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
            onChange={(e) => setWebsite(e.target.value)}
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="mt-2">
          {isLoading ? (
            <Preloader></Preloader>
          ) : (
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
