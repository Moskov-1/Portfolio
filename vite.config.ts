import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // Inline assets smaller than 4 KB (saves round-trips)
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        // Split vendor chunks so the browser can cache React separately from app code
        manualChunks: {
          'react-vendor':  ['react', 'react-dom', 'react-router-dom'],
          'motion-vendor': ['framer-motion'],
          'ui-vendor':     ['lucide-react', '@radix-ui/react-toast'],
        },
      },
    },
  },
})
