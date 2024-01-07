import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid';
import { signal } from '@preact/signals-react';

export const productKeyword = signal('');
export const SearchBar = () => {
  const handleSearch = () => {
    console.log(productKeyword.value);
  };
  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center justify-start max-sm:flex-col w-full relative max-sm:gap-4 max-w-3xl pt-6"
    >
      <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <input
          type="search"
          className="relative m-0 -mr-0.5 block min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search Product"
          onChange={(e) => (productKeyword.value = e.target.value)}
        />

        <button
          className="relative z-[2] flex items-center rounded-r bg-blue-500 px-6 py-2.5 text-xs font-medium leading-tight text-white transition duration-150 ease-in-out hover:bg-primary-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800"
          type="submit"
        >
          <MagnifyingGlassIcon
            className="h-6 w-6 text-black"
            aria-hidden="true"
          />
        </button>
      </div>
    </form>
  );
};
