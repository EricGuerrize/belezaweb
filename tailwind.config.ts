import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8B4B8',
          dark: '#D4A5A9',
        },
        secondary: {
          DEFAULT: '#67595E',
          dark: '#4A3F43',
        },
        accent: {
          DEFAULT: '#F7E7CE',
          dark: '#E8D4B0',
        },
        success: '#A8D5BA',
        warning: '#F5C77E',
        danger: '#E57373',
        background: '#FDF8F5',
        text: '#2D2D2D',
        border: '#E5E7EB',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [],
} satisfies Config

export default config

