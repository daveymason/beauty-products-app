import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	build: {
		rollupOptions: {
			output: {
				manualChunks: (id) => {
					// Create separate chunks for large third-party dependencies
					if (id.includes('node_modules')) {
						return 'vendor';
					}
				}
			}
		}
	}
});
