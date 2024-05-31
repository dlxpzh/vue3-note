import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import viteMarkdown from 'vite-plugin-md';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		// vite支持markdown文件显示
		viteMarkdown(),
		// vue/vue-router自动导入、element按需加载
		AutoImport({
			dts: resolve(__dirname, './src/auto-imports.d.ts'),
			imports: ['vue', 'vue-router'],
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			resolvers: [ElementPlusResolver()],
		}),
		// 查看打包体积
		visualizer({
			open: true, //注意这里要设置为true，否则无效
			gzipSize: true,
			brotliSize: true,
		}),
	],
	// rollup manualChunks echarts打包
	build: {
		rollupOptions: {
			output: {
				manualChunks: {
					echarts: ['echarts'],
				},
			},
		},
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, 'src'),
			},
		],
	},
});
