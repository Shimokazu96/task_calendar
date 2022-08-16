import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
    build: {
        chunkSizeWarningLimit: 100000000,
    },
    server: {
        hmr: {
            host: "localhost",
        },
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/ts/index.tsx"],
            refresh: true,
        }),
        react({
            jsxRuntime: "classic",
        }),
        tsconfigPaths(),
    ],
    resolve: {
        alias: {
            "@": "resources/ts",
        },
    },
});
