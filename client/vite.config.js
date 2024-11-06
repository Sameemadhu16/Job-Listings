import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:4500', // Backend API URL
        secure: false,                   // Disable SSL verification for localhost
        changeOrigin: true,              // Adjusts the origin of the request to the target URL
      },
    },
  },

  plugins: [react()],
})
