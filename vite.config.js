import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Ensures the server is accessible from your network (useful for mobile testing)
    port: 3000, // Specify a custom port if needed
    open: true, // Automatically open the browser on server start
    watch: {
      usePolling: true, // Fixes file change detection in some environments like WSL or Docker
    },
  },
});
