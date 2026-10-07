import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

import path from "path";
import { fileURLToPath } from "url";

const __dirname =
  import.meta.dirname || path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: [path.resolve(__dirname, "./src/test/setup.ts")],
    isolate: false,
  },
});
