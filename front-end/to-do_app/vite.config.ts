/// <reference types="vitest"/>
/// <reference types="Vite/client"/>

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/1
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./setupTests.tsx",
  },
});
