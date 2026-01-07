import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  build: {
    lib: {
      // Points to the index.js we created in the previous step
      entry: resolve(__dirname, 'src/index.js'), 
      name: 'Grimoire',
      fileName: 'grimoire',
    },
    rollupOptions: {
      // Ensure we don't bundle React inside the library
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})