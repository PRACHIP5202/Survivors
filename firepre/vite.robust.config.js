import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { exec } from 'child_process'
import { promisify } from 'util'
import path from 'path'
import fs from 'fs'

const execAsync = promisify(exec)

// Custom plugin to run CSS fix script before build
const cssFixPlugin = () => {
  return {
    name: 'css-fix-plugin',
    async buildStart() {
      console.log('🔧 Running CSS fix plugin...')
      try {
        const scriptPath = path.resolve(__dirname, 'scripts', 'fix-css-before-build.sh')
        
        // Check if script exists
        if (fs.existsSync(scriptPath)) {
          const { stdout, stderr } = await execAsync(`bash ${scriptPath}`)
          console.log(stdout)
          if (stderr) console.error(stderr)
        } else {
          console.warn(`⚠️ CSS fix script not found at ${scriptPath}`)
        }
      } catch (error) {
        console.warn('⚠️ CSS fix plugin warning:', error.message)
        // Continue the build even if the fix script fails
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProd = mode === 'production'
  
  return {
    plugins: [
      react(),
      // Only run CSS fix in production builds
      isProd && cssFixPlugin()
    ].filter(Boolean),
    css: {
      // Generate sourcemaps in development only
      devSourcemap: !isProd,
      // Handle CSS errors gracefully in production
      postcss: {
        plugins: []
      }
    },
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
        // Disable warning generation during the build
        onwarn(warning, warn) {
          // Skip CSS related warnings
          if (warning.code === 'CSS_SYNTAX_ERROR' || 
              warning.message.includes('CSS') || 
              warning.message.includes('.css')) {
            console.log(`⚠️ CSS warning suppressed: ${warning.message}`)
            return
          }
          // Forward other warnings
          warn(warning)
        }
      },
      sourcemap: !isProd,
      // Use standard CSS minification but with safer options
      cssMinify: isProd ? {
        preset: ['default', {
          // Disable problematic minification features
          discardComments: true,
          normalizeWhitespace: true,
          // Features that can cause syntax errors if CSS has issues
          calc: false, // Disable calc() optimization
          mergeLonghand: false, // Disable property merging
          mergeRules: false, // Disable rule merging
          restructure: false, // Disable rule restructuring
        }]
      } : false,
      // Keep CSS in separate files
      cssCodeSplit: true,
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
  }
})
