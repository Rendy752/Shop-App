import { footerLinks } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="flex flex-col text-white bg-gray-600">
      <div className="flex max-md:flex-col flex-wrap justify-between gap-5 sm:px-16 px-6 py-10">
        <div className="flex flex-col justify-start items-start gap-6 max-md:hidden">
          <Image
            src="/logo.png"
            alt="logo"
            width={118}
            height={118}
            priority={true}
          />
          <p className="text-base">
            ShopApp 2023 <br />
            All Rights Reserved &copy;
          </p>
        </div>

        <div className="flex gap-10 max-md:mx-auto">
          {footerLinks.map((item) => (
            <div key={item.title} className="footer__link">
              <h3 className="font-bold mb-5">{item.title}</h3>
              <div className="flex flex-col gap-5">
                {item.links.map((link) => (
                  <Link key={link.title} href={link.url}>
                    {link.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="text-center border-t border-gray-100 py-10">
        <p>Copyright © 2023 ShopApp</p>
      </div>
    </div>
  );
}
