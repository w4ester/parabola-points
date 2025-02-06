import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: 'https://github.com/w4ester/parabola-points',
  plugins: [react()]
})