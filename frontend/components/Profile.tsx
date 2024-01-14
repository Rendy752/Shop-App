'use client';
import React from 'react';
import { user } from '../app/layout';
import { ProfileProps } from '@/types';
import Button from './Button';

export default function Profile({ setShowProfile }: ProfileProps) {
  return (
    <div className="justify-center items-center block overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl mx-auto my-20">
        <h1 className="text-3xl font-bold text-center text-gray-700">
          User Profile
        </h1>
        <div className="mt-6">
          <div className="mb-4">
            <label
              htmlFor="id"
              className="block text-sm font-semibold text-gray-800"
            >
              Id
            </label>
            <input
              value={user.value.id}
              disabled
              id="id"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-800"
            >
              Name
            </label>
            <input
              value={user.value.name}
              disabled
              id="name"
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
              value={user.value.username}
              disabled
              id="username"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              value={user.value.email}
              disabled
              type="email"
              id="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <Button
              title="Done"
              handleClick={() => setShowProfile(false)}
              style="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
