// src/services/apiClient.js
import axios from 'axios';

/*
 * The baseURL is dynamically set based on the environment.
 * - During development (`npm run dev`), Vite uses `.env` for variables.
 * - During production build (`npm run build`), Vite uses `.env.production`.
 */
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Dynamically set base URL from environment variables
  headers: {
    'Content-Type': 'application/json', 
  },
});

export default apiClient;
