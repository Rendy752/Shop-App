import { ButtonProps } from '@/types';
import React from 'react';

const Button = ({ title, style, type, handleClick }: ButtonProps) => {
  return (
    <button type={type || 'button'} className={style} onClick={handleClick}>
      <span className="flex-1">{title}</span>
    </button>
  );
};

export default Button;
