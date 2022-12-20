<template>
	<div class="home">
		<div class="left">
			<user></user>
		</div>
		<div class="right">
			<router-view></router-view>
		</div>
	</div>
</template>

<script lang="ts">
import User from './user.vue';
import { defineComponent, provide } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
	components: {
		User,
	},
	setup() {
		const router = useRouter();
		// 默认vue项目页
		router.replace({ path: '/home/introduce' });
		// 跳转路由
		const toUrl = (id: string) => {
			router.replace({ path: '/home/' + id });
		};
		provide('toUrl', toUrl);
	},
});
</script>

<style lang="less" scoped>
.home {
	.left {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 200px;
		background: #909bd173;
		box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
	}
	.right {
		position: absolute;
		top: 0;
		left: 200px;
		right: 0;
		bottom: 0;
		padding: 20px 50px;
		overflow-y: auto;
		text-align: center;
	}
}
</style>
