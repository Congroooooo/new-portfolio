import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  // ============================================
  // PLUGINS
  // ============================================
  plugins: [
    react(), // Enable React Fast Refresh and JSX transformation
  ],

  // ============================================
  // PATH ALIASES
  // This makes imports cleaner and more maintainable
  // ============================================
  resolve: {
    alias: {
      // Now you can use: import { Button } from '@/components/ui/Button'
      // Instead of: import { Button } from '../../components/ui/Button'
      '@': path.resolve(__dirname, './src'),
    },
  },

  // ============================================
  // BUILD OPTIMIZATIONS
  // Configures production build behavior
  // ============================================
  build: {
    // Output directory for production build
    outDir: 'dist',

    // Generate source maps for debugging (disable in production if needed)
    sourcemap: false,

    // Rollup-specific options
    rollupOptions: {
      output: {
        // ============================================
        // CODE SPLITTING STRATEGY
        // Split dependencies into separate chunks for better caching
        // ============================================
        manualChunks: {
          // React core libraries (rarely changes, can be cached long-term)
          vendor: ['react', 'react-dom'],

          // Animation library (large, load separately)
          animations: ['animejs'],

          // Icon library (if used extensively)
          icons: ['lucide-react'],

          // Intersection observer utilities
          observers: ['react-intersection-observer'],
        },
      },
    },

    // Chunk size warning limit (in KB)
    chunkSizeWarningLimit: 1000,
  },

  // ============================================
  // DEV SERVER OPTIONS
  // ============================================
  server: {
    // Port for development server
    port: 5173,

    // Automatically open browser on server start
    open: false,

    // Enable CORS if needed
    cors: true,

    // Proxy API requests to backend server
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
