import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteSocketIo from "vite-plugin-socket-io";
import { socketEvents } from "./server/server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), viteSocketIo({ socketEvents })],
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
