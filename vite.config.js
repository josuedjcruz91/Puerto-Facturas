import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/tipo-cambio': { target: 'https://apis.gometa.org', changeOrigin: true, rewrite: path => path.replace(/^\/tipo-cambio/, '') }, '/hacienda': { target: 'https://api.hacienda.go.cr', changeOrigin: true, rewrite: path => path.replace(/^\/hacienda/, '') } } },
})
