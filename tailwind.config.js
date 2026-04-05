/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#f59e0b', // Amber 500
          600: '#d97706', // Amber 600
          700: '#b45309', // Amber 700
        },
        secondary: {
          500: '#3b82f6', // blue-500
          600: '#2563eb', // blue-600 (Main CTA)
          700: '#1d4ed8', // blue-700
        },
        surface: '#ffffff',
        background: '#ffffff', // Live site uses white background mainly
        accent: '#f59e0b', // Amber accent
        slate: {
          900: '#111827', // Deep Gray Text
          800: '#1f2937',
          700: '#374151',
          600: '#4b5563',
          500: '#6b7280',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% -20%, #00d2ff22 0%, #0088ff11 50%, transparent 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 136, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 136, 255, 0.6), 0 0 40px rgba(0, 210, 255, 0.2)' },
        }
      }
    },
  },
  plugins: [],
}
