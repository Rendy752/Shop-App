import { VoucherItemProps } from '@/types';
import React, { useState } from 'react';
import {
  TagIcon,
  CalendarDaysIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/16/solid';
import toast from 'react-hot-toast';

const VoucherItem = ({ voucher }: VoucherItemProps) => {
  const [isCopy, setIsCopy] = useState(false);
  return (
    <div className="flex flex-col gap-3 border border-black shadow-xl rounded-xl p-3">
      <div className="flex gap-5">
        <TagIcon className="w-7 h-7 text-green-500" />
        <div>Discount 10k</div>
      </div>
      <div className="flex gap-5 items-center">
        <div>
          Code : <span className="font-semibold">{voucher.code}</span>
        </div>
        {isCopy ? (
          <ClipboardDocumentCheckIcon className="w-7 h-7 text-green-500" />
        ) : (
          <ClipboardDocumentIcon
            className="w-7 h-7 text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(voucher.code);
              toast.success('Succesfully Copied Voucher Code');
              setIsCopy(true);
            }}
          />
        )}
      </div>
      <div className="flex gap-5">
        <CalendarDaysIcon className="w-7 h-7" />
        <div>
          Valid until {voucher.expired_at.toLocaleString().slice(0, 10)}
        </div>
      </div>
    </div>
  );
};

export default VoucherItem;
