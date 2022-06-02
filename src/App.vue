<script lang="ts">
import User from './pages/user/index.vue';
import Menus from './pages/menu/index.vue';
export default {
	components: {
		User,
		Menus,
	},
};
</script>

<template>
	<div class="app">
		<div class="app-top">
			<Menus></Menus>
		</div>
		<div class="app-content">
			<div class="left">
				<user></user>
			</div>
			<div class="content">
				<router-view></router-view>
			</div>
		</div>
		<div class="app-footer">
			<p>*此项目由Dlxpzh开发及维护，其他人未经授权无权作为商业用途使用，违者必究！</p>
		</div>
	</div>
</template>

<style lang="less" scoped>
.app {
	.app-top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 10px 100px;
		box-shadow: 0px 4px 16px 0px rgb(15 47 124 / 20%);
	}
	.app-content {
		position: absolute;
		top: 80px;
		left: 0;
		bottom: 8%;
		width: 100%;
		.left {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			width: 160px;
			background: #909bd173;
			box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
		}
		.content {
			position: absolute;
			top: 0;
			left: 200px;
			right: 0;
			bottom: 0;
			padding: 20px 30px;
			overflow-y: auto;
		}
	}
	.app-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
		width: 100%;
		height: 8%;
		line-height: 20px;
		font-size: 13px;
		color: #aaa;
		background: #333;
	}
}
</style>
