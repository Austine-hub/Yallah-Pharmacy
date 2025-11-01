import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // ✅ Automatically opens browser when running `npm run dev`
    port: 5173, // Optional: set your preferred port
  },
})
