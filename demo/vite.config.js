import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/vuetify-natinf/",
  plugins: [vue()],
  root: "demo",
  build: {
    outDir: "dist",
  },
  rollupOptions: {
    input: "demo/index.html",
  },
});
