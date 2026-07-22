import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        register: './registration-form.html',
        admin: './admin.html'
      }
    }
  },
  server: {
    port: 5173,
  },
});
