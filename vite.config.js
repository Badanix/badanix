/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  base: '/', // important for production routing
  build: {
    outDir: 'dist',
    rollupOptions: {
      // ✅ remove external modules if you’re not using them
    }
  },
  resolve: {
    alias: {
      '@hooks': path.resolve(__dirname, 'src/hooks')
    }
  }
});
