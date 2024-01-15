import { ErrorsProps } from '@/types';
import React from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export const Errors = ({ message }: ErrorsProps) => {
  return (
    <div
      className="animate-show bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex justify-center gap-3"
      role="alert"
    >
      <ExclamationCircleIcon className="h-6 w-6"></ExclamationCircleIcon>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
