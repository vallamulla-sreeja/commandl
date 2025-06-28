import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      keyframes: {
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)' 
          },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out both',
      },
    },
  },
  plugins: [],
} satisfies Config;
