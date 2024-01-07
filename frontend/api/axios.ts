import axios from 'axios';

export const headers = {
  // Accept: 'application/json',
  // 'Content-type': 'application/json',
  Authorization: `Bearer ${
    typeof window !== 'undefined' ? window.localStorage.getItem('token') : ''
  }`,
  // 'Access-Control-Allow-Origin': 'https://rendyp-book.vercel.app',
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers,
});
