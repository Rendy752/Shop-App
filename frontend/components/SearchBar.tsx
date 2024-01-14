import React from 'react';
import { SearchBarProps } from '@/types';

export const SearchBar = ({
  productKeyword,
  setProductKeyword,
}: SearchBarProps) => {
  return (
    <div className="flex items-center justify-start max-sm:flex-col relative max-sm:gap-4 max-w-3xl pt-6">
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="border border-solid p-3 rounded-md text-neutral-700 outline-none transition duration-200 focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search Product"
          value={productKeyword}
          onChange={(e) => setProductKeyword(e.target.value)}
        />
      </div>
    </div>
  );
};
