import { reactRouter } from "@react-router/dev/vite";
import { resolve } from "path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    fs: {
      allow: [".."],
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './app')
    }
  }
});
