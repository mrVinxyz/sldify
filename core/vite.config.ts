import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
	plugins: [solidPlugin()],
	build: {
		lib: {
			entry: './index.ts',
			name: 'Sldify',
			fileName: 'sldify',
			formats: ['es'],
		},
		rollupOptions: {
			external: ['solid-js', 'class-variance-authority', '@solidjs/router'],
		},
	},
});
