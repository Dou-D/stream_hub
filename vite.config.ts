/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {},
  },
  test: {
    globals: true, // 允许直接使用 describe, it, expect 而不需要 import
    environment: "jsdom", // 模拟浏览器环境
    setupFiles: "./src/tests/setup.ts", // 初始化配置
    css: false, // 通常为了速度，会禁用 CSS 处理
    coverage: {
      enabled: true,
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
    },
  },
});
