// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: 5173,  // Must match docker-compose
//     host: true,  // Important for Docker
//     strictPort: true,
//     watch: {
//       usePolling: true,
//       interval: 1000,
//     },
//   },
// })


// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // important in Docker — listen on 0.0.0.0
    port: 5173,          // or 5174 for admin — but usually set via env/command
    proxy: {
      // Proxy all /api calls → backend
      '/api': {
        target: 'http://server:4000',     // container-to-container name works here!
        changeOrigin: true,
        secure: false,
      },
      // If your backend routes are NOT under /api, proxy the root instead:
      // '/': { target: 'http://server:4000', changeOrigin: true, secure: false }
    }
  }
})