<script lang="ts">
import Menus from './pages/menu/index.vue';
export default {
	components: {
		Menus,
	},
};
</script>

<template>
	<div class="page">
		<div class="page-top">
			<Menus></Menus>
		</div>
		<div class="page-content">
			<router-view></router-view>
		</div>
		<div class="page-footer">
			<p>*此项目由Dlxpzh开发及维护，其他人未经授权无权作为商业用途使用，违者必究！</p>
		</div>
	</div>
</template>

<style lang="less" scoped>
.page {
	.page-top {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 10px 100px;
		box-shadow: 0px 4px 16px 0px rgb(15 47 124 / 20%);
	}
	.page-content {
		position: absolute;
		top: 80px;
		left: 0;
		bottom: 8%;
		width: 100%;
	}
	.page-footer {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		text-align: center;
		width: 100%;
		height: 8%;
		line-height: 16px;
		font-size: 13px;
		color: #aaa;
		background: #333;
	}
}
</style>
