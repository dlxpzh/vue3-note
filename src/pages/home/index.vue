<template>
	<div class="home">
		<h2 class="title">Hello！Vue 3 + TypeScript + Vite</h2>
		<h3 class="des">使用Vue3项目开发项目，支持TypeScript类型系统，并用Vite构建</h3>
		<el-table class="table" :data="tableData" stripe border>
			<el-table-column prop="name" label="名称" width="120" />
			<el-table-column prop="version" label="版本号" width="100" />
			<el-table-column prop="authors" label="作者" width="100" />
			<el-table-column prop="des" label="简介" width="180" />
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
		}
		const tableData: Verion[] = [
			{
				name: 'vue2',
				version: '2.4.2',
				authors: 'Evan You',
				des: 'vue2.0版本，一套用于构建用户界面的渐进式框架',
			},
			{
				name: 'vue3',
				version: '3.2.0',
				authors: 'Evan You',
				des: 'vue3.0版本，新增composition API，使用proxy代替Object.defineProperty，支持typescript',
			},
			{
				name: 'vite',
				version: '2.9.7',
				authors: 'Evan You',
				des: '新型web前端构建工具，基于原生ES模块，提供开箱即用的配置，同时拥有高度可扩展性和完整地类型支持',
			},
			{
				name: 'typescript',
				version: '4.5.4',
				authors: 'Microsoft',
				des: '拥有类型系统的JavaScript，前端框架都已支持',
			},
		];
		return {
			tableData,
		};
	},
});
</script>

<style lang="less" scoped>
.home {
	text-align: center;
	.des {
		font-size: 14px;
	}
	.table {
		width: 100%;
	}
}
</style>
