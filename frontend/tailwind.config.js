/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        text: 'text 4s ease infinite', // smoother and longer loop
      },
      keyframes: {
        text: {
          '0%, 100%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
        },
      },
      backgroundSize: {
        '300': '300% 300%', // new size for smoother transitions
      },
    },
  },
  plugins: [],
};
