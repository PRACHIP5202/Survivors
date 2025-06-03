// vite.simple.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Simplified configuration that bypasses CSS processing issues
export default defineConfig({
  plugins: [react()],
  build: {
    // Disable CSS minification to avoid warnings
    cssMinify: false,
    // Ensure CSS is properly organized
    cssCodeSplit: true,
    // Use terser for JS minification
    minify: 'terser',
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
  }
})
