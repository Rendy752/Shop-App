import { MouseEventHandler } from 'react';

export interface ProductProps {
  id: number;
  name: string;
  price: number;
  stock: number;
  created_at: Date;
  updated_at: Date;
}

export interface TransactionProps {
  id: number;
  user_id: number;
  total: number;
  created_at: Date;
  updated_at: Date;
}

export interface DetailTransactionProps {
  id: number;
  transaction_id: number;
  product_id: number;
  total: number;
  created_at: Date;
  updated_at: Date;
  product_name: string;
  product_price: number;
}

export interface TransactionModalProps {
  setShowModal: Function;
  selectedTransactionId: number;
}

export interface VoucherProps {
  id: string;
  code: string;
  transaction_id: number;
  expired_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ReceiptProps {
  message: string;
  transaction_id: number;
  transaction_date: Date;
  transaction_total: number;
  transaction_detail: DetailTransactionProps[];
  voucher_use: VoucherProps[];
  voucher_get: VoucherProps[];
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

export interface VoucherItemProps {
  voucher: VoucherProps;
}

export interface ErrorsProps {
  message: string;
}
