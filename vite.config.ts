import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/login": {
        target: "http://localhost:8000", // Your backend URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
        secure: false // If the backend is running on HTTPS and using self-signed certificates
      }
    }
  }
});
