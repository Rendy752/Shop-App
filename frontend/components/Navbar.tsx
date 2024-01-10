'use client';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { setLogout } from '@/api/services';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
// import { isLoggedIn, user } from '@/app/page';
import { navbarLinks } from '@/constants';
import { isLoggedIn, user } from '@/app/layout';

export default function Navbar() {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);
  const handleLogout = async () => {
    try {
      await setLogout();
      isLoggedIn.value = false;
      user.value.id = 0;
      user.value.name = 'Anonymous';
      user.value.email = '';
      toast.success('Logout Success');
      router.replace('/login');
    } catch (e: any) {
      return;
    }
  };
  if (typeof window !== 'undefined') {
    (window as any).onscroll = function () {
      setShowNavbar(this.oldScroll > this.scrollY);
      this.oldScroll = this.scrollY;
    };
  }

  return (
    <Disclosure
      as="nav"
      className={`bg-gray-600 ${showNavbar ? 'animate-show' : 'animate-hide'}`}
    >
      {({ open }: any) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <>
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navbarLinks.map(
                        (item) =>
                          (!item.isNeedLogin || isLoggedIn.value) && (
                            <Link
                              key={item.title}
                              href={item.url}
                              className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.title}
                            </Link>
                          ),
                      )}
                    </div>
                  </div>
                </div>
              </>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start text-white">
                  {user.value.name}
                </div>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <UserIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {!isLoggedIn.value ? (
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              href="/login"
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      ) : (
                        <>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/profile"
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Profile
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm text-gray-700"
                              >
                                Logout
                              </a>
                            )}
                          </Menu.Item>
                        </>
                      )}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navbarLinks.map(
                (item) =>
                  (!item.isNeedLogin || isLoggedIn.value) && (
                    <Disclosure.Button
                      key={item.title}
                      as="a"
                      href={item.url}
                      className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.title}
                    </Disclosure.Button>
                  ),
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
