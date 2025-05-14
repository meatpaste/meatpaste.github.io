import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/typing/',
  build: {
    outDir: '../../typing',
    emptyOutDir: true,
  },
  plugins: [vue()],
});
