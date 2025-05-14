import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

export default defineConfig({
  root: './', 
  plugins: [
    react(),
    visualizer({
      open: false,
      filename: 'stats.html',
      gzipSize: true,
      brotliSize: true,
      template: 'treemap',
    }),
  ],
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
    outDir: 'dist',
  },
  base: '/', // для dev
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
