import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // Required for Capacitor
  assetsInclude: ["**/*.m4v", "**/*.mpeg"], // Treat .m4v video files as static assets
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
