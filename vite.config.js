import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // URL backend
        changeOrigin: true, // đổi origin header thành backend
        secure: false, // cho phép self-signed SSL nếu dùng https
      },
    },
  },
});
