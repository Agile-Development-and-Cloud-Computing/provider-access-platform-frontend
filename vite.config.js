// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Cleaner imports for components, utilities, etc.
    },
  },
  server: {
    host: true, // Ensures the server is accessible on your local network
    port: process.env.PORT || 3000, // Use Railway's dynamically assigned port or 3000 for local dev
    open: process.env.NODE_ENV !== 'production', // Automatically opens the browser in development, not in production
    watch: {
      usePolling: true, // Ensures file changes are detected across all environments
    },
    proxy: {
      '/api': {
        target: 'https://access-platform.azurewebsites.net', // Proxy API requests to your backend
        changeOrigin: true, // Update the origin header to match the target
        secure: true, // Use HTTPS for secure requests
      },
    },
  },
  build: {
    outDir: 'dist', // Output directory for production builds
    sourcemap: true, // Enable source maps for debugging in production (optional)
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
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'), // Explicitly define the environment
  },
});
