import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production';
  
  return {
    plugins: [react()],
    build: {
      // Production optimizations
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isProd,
          drop_debugger: isProd,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            maps: ['leaflet', 'react-leaflet'],
            router: ['react-router-dom'],
            charts: ['recharts'],
            animations: ['framer-motion'],
          },
        },
      },
      sourcemap: !isProd,
    },
    server: {
      port: 5173,
      strictPort: false,
      // Configure proxy for API in development
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
