import { ErrorsProps } from '@/types';
import React from 'react';

export const Errors = ({ message }: ErrorsProps) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
