import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// Plain static SPA build for GitHub Pages.
// `base` must match the repo path (https://<user>.github.io/<repo>/).
export default defineConfig({
  base: "/arianne-s-living-resume/",
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});
