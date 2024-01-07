export const navbarLinks = [
  { title: 'Product', url: '/product', current: true, isNeedLogin: false },
  {
    title: 'Transaction',
    url: '/transaction',
    current: false,
    isNeedLogin: true,
  },
  { title: 'Voucher', url: '/voucher', current: false, isNeedLogin: true },
];

export const footerLinks = [
  {
    title: 'About',
    links: [
      { title: 'How it works', url: '/' },
      { title: 'Featured', url: '/' },
      { title: 'Partnership', url: '/' },
      { title: 'Bussiness Relation', url: '/' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'Events', url: '/' },
      { title: 'Blog', url: '/' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { title: 'Discord', url: '/' },
      { title: 'Instagram', url: '/' },
      { title: 'Twitter', url: '/' },
      { title: 'Facebook', url: '/' },
    ],
  },
];
