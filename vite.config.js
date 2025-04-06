import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react({
    reactRefresh: true, 
  })],
  build: {
    sourcemap: true,
  },
  base: "/bordify"
});