// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Cleaner imports for your components, utilities, etc.
    },
  },
  server: {
    host: true, // Ensures the server is accessible on your network for mobile testing
    port: process.env.PORT || 3000, // Use Railway's assigned port in production or default to 3000 for local dev
    open: process.env.NODE_ENV !== 'production', // Automatically open browser only in development
    watch: {
      usePolling: true, // Ensures file changes are detected in all environments (e.g., Docker, network-mounted drives)
    },
    proxy: {
      '/api': {
        target: 'https://access-platform.azurewebsites.net', // Proxy API calls to the backend
        changeOrigin: true, // Change the origin header to match the target
        secure: true, // Use HTTPS for secure requests
      },
    },
  },
  build: {
    outDir: 'dist', // Output directory for production builds
    sourcemap: true, // Generate source maps for debugging in production (optional)
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'], // Split vendor code into separate chunks for optimization
        },
      },
    },
  },
  esbuild: {
    drop: process.env.NODE_ENV === 'production' ? ['console', 'debugger'] : [], // Remove console and debugger in production builds
  },
});
