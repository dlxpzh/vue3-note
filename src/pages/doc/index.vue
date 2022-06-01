<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	name: 'doc',
	setup() {
		const list = reactive([
			{
				name: 'typescript文档',
				id: 'typescript',
				date: '2022.04.22',
			},
			{
				name: 'less指令扩展',
				id: 'less',
				date: '2022.02.15',
			},
			{
				name: '前端性能优化专项',
				id: 'optimize',
				date: '2021.12.23',
			},
			{
				name: '从Chrome Performance看页面性能分析',
				id: 'chrome-analyze',
				date: '2021.10.14',
			},
		]);
		const activeId = 'typescript';
		const router = useRouter();
		const handleSelect = (key: string) => {
			router.replace({ path: '/' + key });
		};
		return {
			list,
			activeId,
			handleSelect,
		};
	},
});
</script>

<template>
	<div class="main">
		<div class="menu">
			<el-menu :default-active="activeId" class="menu" @select="handleSelect">
				<el-menu-item v-for="item in list" :key="item.id" :index="item.id">
					<h3 class="name">
						<el-icon><Document /></el-icon>{{ item.name }}
					</h3>
					<p class="date">{{ item.date }}</p>
				</el-menu-item>
			</el-menu>
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="less" scoped>
.main {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	overflow: auto;
	.menu {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		padding: 24px 0;
		width: 280px;
		overflow: auto;
		border-right: 1px solid #ccc;
		.name {
			font-size: 16px;
		}
		.date {
			color: #ccc;
		}
	}
	.content {
		position: absolute;
		top: 0;
		left: 280px;
		right: 0;
		bottom: 0;
		padding: 24px 224px 24px 24px;
		overflow: auto;
	}
}
</style>
