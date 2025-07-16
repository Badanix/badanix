/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Import the 'path' module

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@react-oauth/google', 'react-qr-code']

    }
  },
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks') // Resolve paths dynamically
    },
  },
});
