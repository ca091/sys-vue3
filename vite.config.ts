import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './shared'),
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    rollupOptions: {
      output: {
        // format: 'iife',
        globals: {
          AppConfig: 'AppConfig'
        },
        manualChunks: {
          ele: ['element-plus']
        }
      },
      external: [
        'AppConfig'
      ]
    }
  }
})
