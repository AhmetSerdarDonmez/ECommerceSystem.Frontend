import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 50619,
 //       https: true, // This line will make your Vite dev server run on HTTPS
        proxy: {
            '/api': {
                target: 'https://localhost:7196',
                changeOrigin: true,
                secure: false, // Keep this if your backend uses a self-signed certificate locally
                // https: true, // Remove this line, it's for the proxy to the backend
                // rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})