import axios from 'axios';

export const headers = {
  Authorization: `Bearer ${
    typeof window !== 'undefined' ? window.localStorage.getItem('token') : ''
  }`,
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers,
});
