import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Zyrah/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-gsap':   ['gsap'],
          'vendor-ui':     ['lucide-react'],
          'vendor-three':  ['three'],
          'vendor-r3f':    ['@react-three/fiber', '@react-three/drei'],
          'vendor-r3f-fx': ['@react-three/postprocessing'],
        },
      },
    },
  },
})
