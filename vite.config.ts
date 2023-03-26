import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: "/", // auto open browser
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   },
    //   '/socket.io': {
    //     target: 'http://localhost:3000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/socket.io/, '')
    //   }
    // }
  },
});
