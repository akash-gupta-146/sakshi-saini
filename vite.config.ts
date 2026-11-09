import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // GitHub project pages are served from /<repo-name>/ : the deploy workflow sets VITE_BASE.
  base: process.env.VITE_BASE ?? "/",
  plugins: [react(), tailwindcss()],
  build: {
    // GSAP is the heaviest dependency: keep it in its own long-cached chunk.
    rollupOptions: {
      output: {
        manualChunks: (id) => (id.includes("node_modules/gsap") ? "gsap" : undefined),
      },
    },
  },
});
