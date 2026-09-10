import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  css: {
    // Pinned so the client and SSR builds hash class names identically (no hydration mismatch).
    modules: { generateScopedName: '[name]__[local]__[hash:base64:5]' },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [{ name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ }],
        },
      },
    },
  },
})
