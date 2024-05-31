<template>
	<div class="doc-head">
		<div class="title">
			<el-input class="input" v-model="title" @input="updateMdName" size="large"></el-input>
		</div>
		<div class="btn">
			<!-- <el-button v-if="data.id !== 'add'" size="large" type="primary" icon="Edit" @click="edit">编辑</el-button> -->
			<el-button size="large" type="primary" icon="StarFilled" @click="star" class="star">{{ isStar ? '取消加星' : '加星' }}</el-button>
			<el-button size="large" type="primary" icon="Upload" @click="toTop">{{ isTop ? '取消置顶' : '置顶' }}</el-button>
			<el-button size="large" type="danger" icon="Delete" @click="del">删除</el-button>
		</div>
	</div>
</template>
<script lang="ts" setup>
const props = defineProps({
	data: Object,
});
const emit = defineEmits(['updateMdName', 'star', 'toTop', 'del', 'edit']);
const item: any = props.data;
const title = ref(item.name); //标题
const isStar = ref(item.isStar); // 是否加星
const isTop = ref(item.isTop); // 是否置顶
watch(
	() => props.data,
	(newVal: any) => {
		title.value = newVal.name;
		isStar.value = newVal.isStar;
		isTop.value = newVal.isTop;
	},
	{
		deep: true,
	}
);
// 修改标题
const updateMdName = (val: string) => {
	emit('updateMdName', val);
};
// 加星
const star = () => {
	isStar.value = !isStar.value;
	emit('star', isStar.value);
};
// 置顶
const toTop = () => {
	isTop.value = !isTop.value;
	emit('toTop', isTop.value);
};
// 删除
const del = () => {
	emit('del', item.id);
};
const edit = () => {
	emit('edit', item.id);
};
</script>
<style lang="less" scoped>
.doc-head {
	display: flex;
	justify-content: space-between;
	.title {
		flex: 1;
		margin-right: 20px;
		.input {
			font-size: 16px;
		}
	}
	.btn {
		line-height: 36px;
		.star {
			:deep(.el-icon) {
				color: #ffff6d;
			}
		}
	}
}
</style>
