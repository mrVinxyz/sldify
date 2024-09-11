import {defineConfig} from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        lib: {
            entry: './src/lib/index.ts',
            name: 'SldComponent',
            fileName: 'sld-component',
            formats: ['es']
        },
        rollupOptions: {
            external: ['solid-js', "class-variance-authority"],
        },
        target: "esnext"
    },
    server: {
        port: 4000,
    }
});