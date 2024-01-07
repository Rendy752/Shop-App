'use client';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { signal } from '@preact/signals-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { headers } from '@/api/axios';
import { getProfile } from '@/api/services';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

// export const metadata: Metadata = {
//   title: 'Shop App',
//   description: 'Buy All Your Need in Shop App',
// };

export const isLoggedIn = signal(false);
export const user = signal({
  id: 0,
  name: 'Anonymous',
  username: 'Anonymous',
  email: '',
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        const res = await getProfile();
        user.value.id = res.id;
        user.value.name = res.name;
        user.value.username = res.username;
        user.value.email = res.email;
        isLoggedIn.value = true;
        console.log(isLoggedIn.value);
        router.replace('/product');
      } catch (e: any) {
        isLoggedIn.value = false;
        router.replace('/login');
      }
    };
    checkLogin();
  }, []);
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo.ico" />
      </Head>
      <body className="relative">
        <header className="sticky top-0 z-50">
          <Navbar />
        </header>
        <main className="m-20">
          <Toaster position="top-center" />
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
