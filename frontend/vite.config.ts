import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginImp from 'vite-plugin-imp';
import { resolve } from 'path';

function pathResolve(dir: string): string {
	return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: [
			{
				find: '@',
				replacement: pathResolve('src') + '/',
			},
		],
	},

	plugins: [
		react(),
		vitePluginImp({
			optimize: true,
			libList: [
				{
					libName: 'antd',
					libDirectory: 'es',
					style: name => `antd/es/${name}/style`,
				},
			],
		}),
	],

	css: {
		preprocessorOptions: {
			less: {
				modifyVars: {
					/*
					 * There are some major variables below
					 * all less variables could be found in
					 * https://github.com/ant-design/ant-design/blob/master/components/style/themes/default.less
					 */

					'@ant-prefix': 'dms',
					'@iconfont-css-prefix': 'dms-icon',
					'@primary-color': '#00a884', // primary color for all components
					'@text-color': 'rgba(0, 0, 0, 0.85)', // major text color
					'@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // secondary text color
					'@link-color': '#1890ff', // link color
					'@success-color': '#52c41a', // success state color
					'@warning-color': '#faad14', // warning state color
					'@error-color': ' #f5222d', // error state color
					'@font-size-base': '14px', // major text font size
					'@heading-color': 'rgba(0, 0, 0, 0.85)', // heading text color
					'@disabled-color': 'rgba(0, 0, 0, 0.25)', // disable state color
					'@border-radius-base': '4px', // major border radius
					'@border-color-base': '#a2a5b9', // major border color
					'@box-shadow-base': '0 0 4px rgba(0, 0, 0, 0.85)', // major shadow for layers
				},
				javascriptEnabled: true,
			},
		},
	},

	server: {
		host: '0.0.0.0',
		port: 3000,
	},
});
