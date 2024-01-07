import axios, { AxiosError } from 'axios';
import { api, headers } from './axios';

const ENDPOINT = {
  register: '/register',
  login: '/login',
  profile: '/profile',
  logout: '/logout',
  products: '/products',
  addProduct: '/products/add',
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

export const getProducts = async () => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.products,
      { headers },
    );
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const addProduct = async (
  isbn: string,
  title: string,
  subtitle: string,
  author: string,
  published: string,
  publisher: string,
  pages: string,
  description: string,
  website: string,
) => {
  try {
    const res = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.addProduct,
      {
        isbn: isbn,
        title: title,
        subtitle: subtitle,
        author: author,
        published: published,
        publisher: publisher,
        pages: pages,
        description: description,
        website: website,
      },
      { headers },
    );
    return Promise.resolve(res.data);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const message = e.response!.data.message;
      return Promise.reject(message);
    }
    return Promise.reject(e);
  }
};

export const editProduct = async (
  id: number,
  isbn: string,
  title: string,
  subtitle: string,
  author: string,
  published: string,
  publisher: string,
  pages: string,
  description: string,
  website: string,
) => {
  try {
    const res = await axios.put(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.products + `/${id}/edit`,
      {
        isbn: isbn,
        title: title,
        subtitle: subtitle,
        author: author,
        published: published,
        publisher: publisher,
        pages: pages,
        description: description,
        website: website,
      },
      { headers },
    );
    return Promise.resolve(res.data);
  } catch (e: unknown) {
    if (e instanceof AxiosError) {
      const message = e.response!.data.message;
      return Promise.reject(message);
    }
    return Promise.reject(e);
  }
};

export const getSpesificProduct = async (id: number) => {
  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.products + `/${id}`,
      { headers },
    );
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const deleteSpesificProduct = async (id: number) => {
  try {
    const res = await axios.delete(
      process.env.NEXT_PUBLIC_BACKEND_URL + ENDPOINT.products + `/${id}`,
      { headers },
    );
    return Promise.resolve(res.data);
  } catch (e) {
    return Promise.reject(e);
  }
};
