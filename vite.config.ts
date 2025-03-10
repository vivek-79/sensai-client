import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],

  server:{
    proxy:{
      '/v1':'https://499029db-4ab6-460b-9ad7-8f86b6f97638.e1-us-east-azure.choreoapps.dev/api'
    }
  }
})
