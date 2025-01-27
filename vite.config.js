// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Allows cleaner imports 
    },
  },
  server: {
    host: true, // Ensures the server is accessible on the network
    port: process.env.PORT || 3000, // Use Railway's dynamically assigned port in production or 3000 for local dev
    open: process.env.NODE_ENV !== 'production', // Prevent browser opening in production
    watch: {
      usePolling: true, // Ensures file changes are detected in all environments
    },
  },
});
