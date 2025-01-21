// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // Allows cleaner imports like `import Component from '@/components/Component';`
    },
  },
  server: {
    host: true, // Ensures the server is accessible from your network (useful for mobile testing)
    port: 3000, // Customize the port
    open: true, // Automatically opens the browser
    watch: {
      usePolling: true, // Ensures file changes are detected in all environments
    },
  },
});
