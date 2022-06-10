<template>
	<el-menu :default-active="activeId" class="menu" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @select="handleSelect">
		<el-menu-item v-for="item in list" :key="item.id" :index="item.id">
			<el-icon><component class="icon" :is="item.icon" /></el-icon>
			<span>{{ item.name }}</span>
		</el-menu-item>
	</el-menu>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

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
		const router = useRouter();
		const route = useRoute();
		/**
		 * 获取activeId
		 * 业务里监听路由的变化，更新activeId值
		 * el-menu组件监听了defaultActive，会实时更新激活项
		 *
		 * 或者
		 * 模板里直接取$route.name
		 */
		let activeId: any = ref('');
		watch(
			() => route.path,
			newPath => {
				const path = newPath.split('/')[1];
				activeId.value = path;
			}
		);
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
