<template>
	<el-menu :default-active="activeId" class="menu" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
		<el-menu-item v-for="item in list" :key="item.id" :index="item.id">
			<el-icon><component class="icon" :is="item.icon" /></el-icon>
			<span>{{ item.name }}</span>
		</el-menu-item>
	</el-menu>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	setup() {
		const list = reactive([
			{
				name: '首页',
				id: 'home',
				icon: 'HomeFilled',
			},
			{
				name: '技术文档',
				id: 'doc',
				icon: 'Document',
			},
			{
				name: '随笔',
				id: 'note',
				icon: 'Edit',
			},
			{
				name: 'GitHub',
				id: 'git',
				icon: 'Link',
			},
		]);
		const activeId = 'home';
		const router = useRouter();
		const handleSelect = (key: string) => {
			if (key === 'git') {
				window.open('https://github.com/dlxpzh');
			} else {
				router.replace({ path: '/' + key });
			}
		};
		return {
			list,
			activeId,
			handleSelect,
		};
	},
});
</script>
<style lang="less" scoped>
.menu {
	width: 100%;
	justify-content: center;
	.icon {
		font-size: 15px;
	}
}
</style>
