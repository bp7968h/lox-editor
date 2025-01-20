/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        destructive: 'hsl(0, 62.8%, 30.6%)',
        group: 'hsl(346.8 77.2% 49.8%)',
        code: 'rgb(39, 39, 42)',
      },
    },
  },
  plugins: [],
}

