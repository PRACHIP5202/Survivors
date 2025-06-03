import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Safe configuration that bypasses CSS processing issues
export default defineConfig({
  plugins: [react()],
  css: {
    // Disable sourcemaps for production
    devSourcemap: false,
    // Use a minimal PostCSS config
    postcss: {
      plugins: []
    }
  },
  build: {
    // Disable CSS minification
    cssMinify: false,
    // Keep CSS in separate files
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
