import { defineConfig } from "astro/config";
import { resolve } from "path";

export default defineConfig({
  // 项目根目录
  root: ".",

  // 静态资源目录
  publicDir: "public",

  // 输出目录
  outDir: "dist",

  // 服务器配置
  server: {
    port: 3000,
    open: true,
  },

  // 构建配置
  build: {
    // 生成资源文件名格式
    assets: "assets",

    // 是否生成 sitemap
    sitemap: true,
  },

  // 集成（可选）
  integrations: [],
});
