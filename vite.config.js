import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    proxy: {
      "/jira": {
        target: "https://ssafy.atlassian.net", // 실제 Jira Cloud 도메인
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/jira/, ""),
      },
    },
  },
});
