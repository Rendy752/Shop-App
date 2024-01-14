'use client';
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { effect, signal } from '@preact/signals-react';
import { useEffect, useState } from 'react';
import { headers } from '@/api/axios';
import { getProfile } from '@/api/services';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';
import Preloader from '@/components/Preloader';
import Login from '@/components/Login';
import Register from '@/components/Register';
import Profile from '@/components/Profile';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      setIsLoading(true);
      try {
        headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
        const res = await getProfile();
        user.value.id = res.id;
        user.value.name = res.name;
        user.value.username = res.username;
        user.value.email = res.email;
        isLoggedIn.value = true;
        setIsLogin(true);
      } catch (e: any) {
        isLoggedIn.value = false;
        setIsLogin(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <body className="relative">
        {!isLoading ? (
          <>
            <header className="sticky top-0 z-50">
              <Navbar
                isLogin={isLogin}
                setIsLogin={setIsLogin}
                setShowLogin={setShowLogin}
                setShowProfile={setShowProfile}
              />
            </header>
            <main className="sm:m-8 md:m-12 lg:m-16 xl:m-20">
              <Toaster position="top-center" />
              {children}
            </main>
          </>
        ) : (
          <Preloader />
        )}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setShowRegister={setShowRegister}
            setIsLogin={setIsLogin}
          />
        )}
        {showRegister && (
          <Register
            setShowRegister={setShowRegister}
            setShowLogin={setShowLogin}
          />
        )}
        {showProfile && <Profile setShowProfile={setShowProfile} />}
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
