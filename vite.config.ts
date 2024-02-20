import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './env-config',
  plugins: [react()],
  define: {
    global: 'window',
    },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    port: 5172,
  },
})
