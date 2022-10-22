import { mergeConfig } from "vite";
import { configDefaults, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./setupTest.js",
      include: ["src/**/*.{test,spec}.{ts,tsx}"],
      exclude: configDefaults.exclude,
      testTimeout: 10000,
    },
  })
);
