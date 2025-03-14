import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 50619,
        proxy: {
            '/api': {
                target: 'https://localhost:7196',
                changeOrigin: true,
                secure: false,
//                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})