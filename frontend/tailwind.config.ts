import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        hide: {
          // navbar-1
          '0%': {
            transform: 'translateY(0)',
            visibility: 'visible',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100%)',
            visibility: 'hidden',
            opacity: '0',
          },
        },
        show: {
          // navbar-1
          '0%': {
            transform: 'translateY(-100%)',
            visibility: 'hidden',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            visibility: 'visible',
            opacity: '1',
          },
        },
      },
      animation: {
        hide: 'hide 0.5s forwards', // navbar-1
        show: 'show 0.5s forwards', // navbar-1
        dropdown: 'dropdown 0.5s forwards', // navbar-1
      },
    },
  },
  plugins: [],
};
export default config;
