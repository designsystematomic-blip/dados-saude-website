import { reactRouter } from "@react-router/dev/vite";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  optimizeDeps: {
    include: ["design-system-atomic"],
  },
  ssr: {
    noExternal: ["design-system-atomic"],
  },
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    fs: {
      allow: [".."],
    },
    allowedHosts: [
      "samba-birth-abs-baskets.trycloudflare.com", // Remova o https://
      // Você também pode adicionar outros hosts se necessário:
      "localhost",
      ".trycloudflare.com", // Permite qualquer subdomínio do trycloudflare.com
    ],
  },
  resolve: {
    alias: {
      "~": resolve(__dirname, "./app"),
    },
  },
});
