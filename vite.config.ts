import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  root: path.resolve(__dirname, ""),
  build: {
    outDir: "./dist",
  },
  plugins: [react()],
  server: {
    port: 8080,
  },
});
