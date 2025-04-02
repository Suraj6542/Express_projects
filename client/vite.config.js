// client/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    react(), // Ensure the React plugin is included
    tailwindcss(), // Ensure TailwindCSS is properly configured
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Ensure this matches the backend server's URL
        changeOrigin: true,
      },
    },
  },
});
