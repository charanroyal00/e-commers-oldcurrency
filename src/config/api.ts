// API Configuration
// Vite exposes env variables via import.meta.env, not process.env
export const API_CONFIG = {
  // Backend API base URL - Update this to match your Django backend
  // You can also set VITE_API_BASE_URL in a .env file
  BASE_URL: (import.meta.env.VITE_API_BASE_URL as string) || 'http://localhost:8000/api',

  // Request timeout in milliseconds
  TIMEOUT: 30000,

  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },

  // Authentication token key in localStorage
  TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
}