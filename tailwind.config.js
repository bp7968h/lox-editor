/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        code_mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        destructive: 'hsl(0, 62.8%, 30.6%)',
        group: 'hsl(346.8 77.2% 49.8%)',
        code: 'rgb(39, 39, 42)',
        code_red: 'rgb(249, 117, 131)',
        code_blue: 'rgb(121, 184, 255)',
        code_purple: 'rgb(179, 146, 240)',
        code_green: 'rgb(133, 232, 157)'
      },
    },
  },
  plugins: [],
}

