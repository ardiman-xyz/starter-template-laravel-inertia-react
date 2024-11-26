import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.tsx"],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": "/resources/js",
        },
    },
    optimizeDeps: {
        include: [
            "react-big-calendar",
            "@babel/runtime/helpers/esm/callSuper",
            "@babel/runtime/helpers/esm/inherits",
        ],
    },
});
