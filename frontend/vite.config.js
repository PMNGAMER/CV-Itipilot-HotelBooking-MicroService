import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4900, // Change this to the desired port number
  },
  plugins: [react()],
});
