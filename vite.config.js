/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist', 
    rollupOptions: {
      external: ['@react-oauth/google', 'react-qr-code']
    }
  },
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks')
    }
  }
});
