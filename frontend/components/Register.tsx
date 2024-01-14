'use client';
import { useState } from 'react';
import Preloader from '@/components/Preloader';
import { Errors } from '@/components/Errors';
import { setRegister } from '@/api/services';
import toast from 'react-hot-toast';
import { RegisterProps } from '@/types';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Button from './Button';

export default function Register({
  setShowRegister,
  setShowLogin,
}: RegisterProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await setRegister(name, username, email, password, confirmPassword);
      setError('');
      setIsLoading(false);
      toast.success('Registration Success');
      setShowRegister(false);
      setShowLogin(true);
    } catch (e: any) {
      setIsLoading(false);
      setError(e);
    }
  };

  return (
    <div className="justify-center items-center block overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl mx-auto my-20 border border-black">
        <button
          className="rounded-lg p-1 float-right transition-all hover:bg-gray-200"
          onClick={() => setShowRegister(false)}
        >
          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
        </button>
        <h1 className="text-3xl font-bold text-center text-gray-700">
          Register
        </h1>
        <form className="mt-6" onSubmit={handleRegister}>
          {error && (
            <div className="mb-4">
              <Errors message={error}></Errors>
            </div>
          )}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="flex justify-between gap-2">
            <div className="mb-2 w-full">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2 w-full">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-800"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
          </div>
          <div className="mt-2">
            {isLoading ? (
              <Preloader />
            ) : (
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              >
                Register
              </button>
            )}
          </div>
        </form>

        <p className="mt-4 text-sm text-center text-gray-700">
          Already have an account?{' '}
          <Button
            title="Login"
            style="font-medium text-blue-600 hover:underline"
            handleClick={() => {
              setShowRegister(false);
              setShowLogin(true);
            }}
          />
        </p>
      </div>
    </div>
  );
}
