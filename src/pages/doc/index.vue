<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { docList } from './data.js';
export default defineComponent({
	name: 'doc',
	setup() {
		const router = useRouter();
		// 搜索过滤
		const keyWord = ref();
		const list = computed(() => {
			if (!keyWord.value) {
				return docList;
			}
			const result: any[] = [];
			docList.forEach(i => {
				if (i.name.includes(keyWord.value)) {
					result.push(i);
				}
			});
			return result;
		});
		// 点击项
		let activeId = ref('typescript');
		router.replace({ path: '/doc/' + activeId.value });
		const handleSelect = (key: string) => {
			router.replace({ path: '/doc/' + key });
			activeId.value = key;
		};
		return {
			list,
			activeId,
			handleSelect,
			keyWord,
			Search,
		};
	},
});
</script>

<template>
	<div class="main">
		<div class="left">
			<div class="filter">
				<el-input class="input" size="default" v-model="keyWord" :prefix-icon="Search" placeholder="搜索全部文档" />
			</div>
			<ul class="menu">
				<li v-for="item in list" :key="item.id" :index="item.id" :class="{ active: activeId === item.id }" @click="handleSelect(item.id)">
					<div class="title">
						<el-icon class="icon"><Document /></el-icon>
						<el-tooltip :content="item.name">
							<span class="name">{{ item.name }}</span>
						</el-tooltip>
					</div>
					<div class="date">{{ item.date }}</div>
				</li>
			</ul>
		</div>
		<div class="content">
			<router-view></router-view>
		</div>
	</div>
</template>

<style lang="less" scoped>
.main {
	display: flex;
	height: 100%;
	overflow: auto;
	.left {
		flex: 1;
		overflow: auto;
		border-right: 1px solid #ccc;
		.filter {
			margin: 20px 10px;
			.input {
				/deep/ .el-input__wrapper {
					border-radius: 16px;
				}
			}
		}
		.menu {
			padding-left: 0;
			margin: 0;
			li {
				padding: 8px 16px;
				list-style: none;
				border-bottom: 1px solid #eee;
				cursor: pointer;
				&:hover {
					background: #eee;
				}
				&.active {
					background: #c8c8c83d;
					.name {
						color: #2f74ed;
					}
				}
				.title {
					display: inline-flex;
					justify-content: center;
					align-items: center;
					height: 100%;
					margin: 0;
					height: 36px;
					line-height: 36px;
					font-size: 14px;
					.name {
						width: 160px;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.icon {
						font-size: 18px;
						padding-right: 10px;
						color: #2f74ed;
					}
				}
				.date {
					height: 20px;
					line-height: 20px;
					padding-left: 28px;
					font-size: 12px;
					color: #bbb;
				}
			}
		}
	}
	.content {
		flex: 3;
		padding: 20px;
		overflow: auto;
	}
}
</style>
