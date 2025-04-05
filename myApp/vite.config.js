import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/scraper": {
        target: "https://obj-oegaseo74q-uc.a.run.app", 
        changeOrigin: true
      }
    },
    cors: {
      origin: "https://obj-oegaseo74q-uc.a.run.app", 
      credentials: true, 
      methods: "GET"
    }
  }
})
