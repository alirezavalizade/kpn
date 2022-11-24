import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: {
    "process.env": {},
  },
  server: {
    proxy: {
      "/shop/api": {
        target: "https://www.kpn.com",
        changeOrigin: true,
      },
      "/shop/cdn": {
        target: "https://www.kpn.com",
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    include: ["lodash/debounce"],
  },
});
