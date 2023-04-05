import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import path from 'path';
import autoprefixer from 'autoprefixer';
import sass from 'sass';

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve(path.resolve(), './src'),
		},
	},

	plugins: [react()],

	css: {
		postcss: {
			plugins: [
				autoprefixer({
					overrideBrowserslist: 'last 2 versions',
				}),
			],
		},

		preprocessorOptions: {
			sass: {
				// Global scss files
				additionalData: `@import "./src/assets/style/mixins.scss"`,
				implementation: sass,
			},
		},
	},
});
