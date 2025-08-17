import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss()
  ],
  define: {
    global: 'globalThis',
    'process.env': {},
    'process.version': '"v16.0.0"',
    'process.platform': '"browser"',
    'process.browser': true,
  },
  resolve: {
    alias: {
      buffer: 'buffer',
      util: 'util',
      process: 'process/browser',
    },
  },
  optimizeDeps: {
    include: ['buffer', 'util', 'process'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  build: {
    rollupOptions: {
      external: [],
    },
  },
})
