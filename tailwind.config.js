/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",         // Inclua o arquivo raiz do Vite
    "./src/**/*.{js,jsx}"   // Inclua todos os arquivos React
  ],
  theme: {
    extend: {}, // Aqui você pode customizar o tema
  },
  plugins: [],
};
