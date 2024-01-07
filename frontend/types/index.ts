import { MouseEventHandler } from 'react';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductTransactionProps {
  id: number;
  name: string;
  price: number;
  amount: number;
}

export interface ButtonProps {
  title: string;
  style?: string;
  type?: 'button' | 'submit';
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface ErrorsProps {
  message: string;
}

export type TUser = {
  id: number;
  name: string;
  email: string;
};

export interface IError {
  message: string;
}
