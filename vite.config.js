import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react({ reactRefresh: true }),
    visualizer({
      open: true,
      filename: "stats.html",
      gzipSize: true,
      brotliSize: true,
      template: "treemap",
      // Remove the `exclude` option for now
    }),
  ],
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1000,
  },
  base: "/bordify"
});