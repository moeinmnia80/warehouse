import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";

import path from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";

const __dirname =
  import.meta.dirname || path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    babel({
      presets: [reactCompilerPreset()],
    }),
  ],
  server: { port: 3000 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
