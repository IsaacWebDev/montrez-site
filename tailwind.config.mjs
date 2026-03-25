/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        foreground: '#fafafa',
        card: '#1a1a1a',
        'card-foreground': '#fafafa',
        primary: '#d4af37',
        'primary-foreground': '#0a0a0a',
        muted: '#262626',
        'muted-foreground': '#999999',
        border: '#333333',
      },
    },
  },
  plugins: [],
}
