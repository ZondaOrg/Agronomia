import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    const isVercelPreview = process.env.VERCEL_ENV === "preview";
    const prNumber = process.env.VERCEL_GIT_PULL_REQUEST_ID;

    const apiBaseUrl =
        isVercelPreview && prNumber
            ? `https://agronomia-pr-${prNumber}.onrender.com`
            : env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL;

    return {
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
                "@styled-system": path.resolve(__dirname, "./styled-system"),
            },
        },
        plugins: [react()],
        define: {
            "import.meta.env.VITE_API_BASE_URL": JSON.stringify(apiBaseUrl),
        },
        server: {
            proxy: {
                "/api": {
                    target: apiBaseUrl || "http://localhost:8080",
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, "/api"),
                },
            },
        },
    };
});
