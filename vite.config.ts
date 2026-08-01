import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-fallback',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && !req.url.includes('.') && !req.url.startsWith('/api') && !req.url.startsWith('/@') && !req.url.startsWith('/src') && !req.url.startsWith('/node_modules')) {
            const path = req.url.toLowerCase()
            const appRoutes = ['/admin', '/seller', '/auth', '/dashboard', '/products', '/orders', '/sellers', '/customers', '/analytics', '/settings', '/register', '/login']
            if (appRoutes.some((route) => path.startsWith(route))) {
              req.url = '/admin.html'
            } else {
              req.url = '/index.html'
            }
          }
          next()
        })
      },

    },
  ],
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
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})

