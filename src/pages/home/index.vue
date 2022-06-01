<template>
	<div id="app">
		<h2 class="title">Hello！Vue 3 + TypeScript + Vite</h2>
		<h3 class="des">vue3、typescript项目</h3>
		<el-table :data="tableData" style="width: 100%" stripe border>
			<el-table-column prop="name" label="名称" width="180" />
			<el-table-column prop="version" label="版本号" width="180" />
			<el-table-column prop="authors" label="作者" width="180" />
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
		}
		const tableData: Verion[] = [
			{
				name: 'vue',
				version: '1.2.1',
				authors: 'Evan You',
			},
			{
				name: 'vue2',
				version: '2.4.2',
				authors: 'Evan You',
			},
			{
				name: 'vue3',
				version: '3.2.0',
				authors: 'Evan You',
			},
		];
		return {
			tableData,
		};
	},
});
</script>

<style lang="less"></style>
