import axios, { AxiosError } from 'axios';
import { api, headers } from './axios';
import { ProductTransactionProps } from '@/types';

const ENDPOINT = {
  register: '/register',
  login: '/login',
  profile: '/profile',
  logout: '/logout',
  product: '/product',
  transaction: '/transaction',
};

export const setRegister = async (
  name: string,
  username: string,
  email: string,
  password: string,
  confirm_password: string,
) => {
  try {
    const res = await api.post(ENDPOINT.register, {
      name: name,
      username: username,
      email: email,
      password: password,
      confirm_password: confirm_password,
    });
    return Promise.resolve(res.data);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const message = e.response!.data.message;
      return Promise.reject(message);
    }
    return Promise.reject(e);
  }
};

export const setLogin = async (email: string, password: string) => {
  try {
    const res = await api.post(ENDPOINT.login, {
      email: email,
      password: password,
    });
    localStorage.setItem('token', res.data.token);
    return Promise.resolve(res.data);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const message = e.response!.data.message;
      return Promise.reject(message);
    }
    return Promise.reject(e);
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get(ENDPOINT.profile, { headers });
    return Promise.resolve(res.data.profile);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const setLogout = async () => {
  try {
    const res = await api.delete(ENDPOINT.logout);
    const checkLocalStorage =
      typeof window !== 'undefined' ? window.localStorage.getItem('token') : '';
    if (checkLocalStorage) localStorage.removeItem('token');
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getAllProduct = async () => {
  try {
    const res = await api.get(ENDPOINT.product);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getAllTransaction = async () => {
  try {
    const res = await api.get(ENDPOINT.transaction);
    console.log(res);
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const addTransaction = async (
  product_transaction: ProductTransactionProps[],
  total_cost: number,
) => {
  try {
    const res = await api.post(ENDPOINT.transaction, {
      product_transaction: product_transaction,
      total_cost: total_cost,
    });
    return Promise.resolve(res.data);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const message = e.response!.data.message;
      return Promise.reject(message);
    }
    return Promise.reject(e);
  }
};

export const timeAgo = (value: any) => {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(value).getTime()) / 1000,
  );
  let interval = seconds / 31536000;
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), 'year');
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), 'month');
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), 'day');
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), 'hour');
  }
  interval = seconds / 60;
  if (interval > 1) {
    return rtf.format(-Math.floor(interval), 'minute');
  }
  return rtf.format(-Math.floor(interval), 'second');
};
