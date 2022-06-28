<template>
	<div class="vue">
		<h2 class="title">Hello！Vue 3 + TypeScript + Vite</h2>
		<h3 class="des">使用Vue3开发项目，支持TypeScript类型系统，并用Vite构建</h3>
		<el-table class="table" :data="tableData" stripe border>
			<el-table-column prop="name" label="名称" width="160" />
			<el-table-column prop="version" label="版本号" width="120">
				<template #default="scope">
					<el-tag effect="dark">{{ scope.row.version }}</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="authors" label="作者" width="120" />
			<el-table-column prop="des" label="简介" />
			<el-table-column prop="github" label="github">
				<template #default="scope">
					<el-link type="primary" target="_blank" :href="scope.row.github">{{ scope.row.github }}</el-link>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue';
export default defineComponent({
	setup() {
		interface Verion {
			name: string;
			version: string;
			authors: string;
			des?: string;
			github?: string;
		}
		const tableData: Verion[] = [
			{
				name: 'Vue2',
				version: 'V2.4.2',
				authors: 'Evan You',
				des: 'vue2.0版本，一套用于构建用户界面的渐进式框架',
				github: 'https://github.com/vuejs/vue',
			},
			{
				name: 'Vue3',
				version: 'V3.2.0',
				authors: 'Evan You',
				des: 'vue3.0版本，新增composition API，使用proxy代替Object.defineProperty，支持typescript',
				github: 'https://github.com/vuejs/core',
			},
			{
				name: 'Vite',
				version: 'V2.9.7',
				authors: 'Evan You',
				des: '新型web前端构建工具，基于原生ES模块，提供开箱即用的配置，同时拥有高度可扩展性和完整地类型支持',
				github: 'https://github.com/vitejs/vite',
			},
			{
				name: 'Typescript',
				version: 'V4.5.4',
				authors: 'Microsoft',
				des: '拥有类型系统的JavaScript，前端框架都已支持',
				github: 'https://github.com/microsoft/TypeScript',
			},
			{
				name: 'Vite-plugin-md',
				version: 'V0.13.1',
				authors: 'Anthony Fu',
				des: '一款支持用vite解析markdown文档的插件',
				github: 'https://github.com/antfu/vite-plugin-md',
			},
			{
				name: 'Element-plus',
				version: 'V2.2.0',
				authors: 'Elem',
				des: 'elementUI升级版，使用typescript编写，支持vue3等项目',
				github: 'https://github.com/element-plus/element-plus',
			},
			{
				name: 'v-md-editor',
				version: 'V2.3.15',
				authors: 'code-farmer-i',
				des: '基于Vue开发的markdown编辑器组件，高度可定制化、可扩展性，支持自定义主题',
				github: 'https://github.com/code-farmer-i/vue-markdown-editor',
			},
			{
				name: 'Prismjs',
				version: 'V1.26.0',
				authors: 'Lea Verou .etc',
				des: '一款轻量级、可扩展的语法高亮显示工具，在支持现代 Web 标准基础下增加了更多可选的风格插件',
				github: 'https://github.com/PrismJS/prism',
			},
		];
		return {
			tableData,
		};
	},
});
</script>

<style lang="less" scoped>
.vue {
	.des {
		font-size: 14px;
		color: #333;
	}
	.table {
		width: 100%;
	}
}
</style>
