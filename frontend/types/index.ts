import { MouseEventHandler } from 'react';

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
