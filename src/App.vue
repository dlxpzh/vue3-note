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
	position: relative;
	width: 100%;
	height: 100%;
	.app-top {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 20px 200px;
		box-shadow: 0px 4px 16px 0px rgb(15 47 124 / 20%);
	}
	.app-content {
		position: absolute;
		top: 100px;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		height: 890px;
		.left {
			flex: 1;
			background: #909bd173;
		}
		.content {
			position: relative;
			flex: 4;
			padding: 50px 100px;
		}
	}
	.app-footer {
		position: fixed;
		left: 0;
		bottom: 0;
		text-align: center;
		width: 100%;
		height: 60px;
		line-height: 40px;
		font-size: 13px;
		color: #aaa;
		background: #333;
	}
}
</style>
