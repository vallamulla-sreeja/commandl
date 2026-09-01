import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Design tokens for semantic colors
        primary: {
          DEFAULT: '#58CC02',
          50: '#E8F8E0',
          100: '#D1F1C1',
          200: '#A3E383',
          300: '#75D545',
          400: '#58CC02',
          500: '#4BA302',
          600: '#3A7F01',
          700: '#2A5C01',
          800: '#1A3801',
          900: '#0A1500',
          foreground: '#FFFFFF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#E5E5E5',
          300: '#D4D4D4',
          400: '#A3A3A3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          foreground: '#1E1E1E',
        },
        accent: {
          DEFAULT: '#EFCCFF',
          50: '#FCF5FF',
          100: '#F9EBFF',
          200: '#F3D6FF',
          300: '#EFCCFF',
          400: '#E0A8FF',
          500: '#D184FF',
          600: '#B85FFF',
          700: '#9F3BFF',
          800: '#7F16E6',
          900: '#5F00CC',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // 8-pt type scale
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        'xl': ['1.5rem', { lineHeight: '2rem' }],       // 24px
        '2xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '3xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '4xl': ['3rem', { lineHeight: '3rem' }],        // 48px
        '5xl': ['3.75rem', { lineHeight: '1' }],        // 60px
        '6xl': ['4.5rem', { lineHeight: '1' }],         // 72px
      },
      keyframes: {
        scroll: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        scroll: 'scroll 20s linear infinite',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-hero': 'linear-gradient(135deg, #C3E88D 0%, #90F1FF 50%, #A560F9 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
