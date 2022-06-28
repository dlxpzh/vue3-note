<script lang="ts">
import { computed, defineComponent, ref, reactive, onMounted } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { data } from './data.js';
import docHead from './docHead.vue';
import dayjs from 'dayjs';
export default defineComponent({
	name: 'doc',
	components: {
		docHead,
	},
	setup() {
		const router = useRouter();
		// 文档列表增加响应式控制
		const docList = reactive(data);
		// 默认激活项
		let activeItem = ref('');
		// 点击左侧项
		const handleSelect = (item: any) => {
			router.replace({ path: '/doc/' + item.id });
			activeItem.value = item;
		};
		handleSelect(docList[0]);
		// 默认新增文档
		const mdName = '无标题markdown';
		const firstFile: any[] = reactive([]);
		const addFile = () => {
			const firstItem = {
				name: mdName,
				id: 'add',
				date: dayjs().format('YYYY.MM.DD'),
			};
			firstFile.push(firstItem);
			handleSelect(firstItem);
		};
		// 更新左侧文件的name
		const updateMdName = (name: string) => {
			if (activeItem.value.id === 'add') {
				firstFile[0].name = name;
			} else {
				const item = docList.find(i => i.id === activeItem.value.id);
				if (item) {
					item.name = name;
				}
			}
		};
		// 加星
		const star = (val: boolean) => {
			if (activeItem.value.id === 'add') {
				firstFile[0].isStar = val;
			} else {
				const item = docList.find(i => i.id === activeItem.value.id);
				if (item) {
					item.isStar = val;
				}
			}
		};
		// 置顶
		const toTop = (val: string) => {
			if (activeItem.value.id === 'add') {
				firstFile[0].isTop = val;
			} else {
				const index = docList.findIndex(i => i.id === activeItem.value.id);
				// 先置顶处理
				const item: any = docList.splice(index, 1)[0];
				docList.unshift(item);
				// 再增加置顶标识
				if (item) {
					item.isTop = val;
				}
			}
		};
		// 删除
		const del = (id: string) => {
			console.log('del: ', id);
		};
		// 获取实际文件列表，包括新增文件、搜索过滤等
		const keyWord = ref();
		const list = computed(() => {
			if (!keyWord.value) {
				return firstFile.concat(docList);
			}
			const result = docList.filter(i => {
				return i.name.includes(keyWord.value);
			});
			return firstFile.concat(result);
		});
		// 根据滑动页面，实时计算文档标题宽度，实时显隐省略号
		const leftRef = ref();
		const nameWidth = ref(0);
		onMounted(() => {
			const width = leftRef.value.getBoundingClientRect().width;
			nameWidth.value = width;
		});
		const changeWidth = val => {
			nameWidth.value = val;
		};
		const nameStyle: any = computed(() => {
			const style = {};
			style.width = nameWidth.value - 70 + 'px';
			return style;
		});
		return {
			list,
			activeItem,
			handleSelect,
			keyWord,
			Search,
			addFile,
			nameStyle,
			updateMdName,
			star,
			toTop,
			del,
			changeWidth,
			leftRef,
		};
	},
});
</script>

<template>
	<dz-split class="main" value="20%" min="200px" :show-collapse="true" @input="changeWidth">
		<template v-slot:left>
			<div class="left" ref="leftRef">
				<div class="filter">
					<el-input class="input" size="default" v-model="keyWord" :prefix-icon="Search" placeholder="搜索全部文档" />
					<el-button type="primary" icon="Plus" circle @click="addFile" />
				</div>
				<ul class="menu">
					<li v-for="item in list" :key="item.id" :index="item.id" :class="{ active: activeItem.id === item.id }" @click="handleSelect(item)">
						<div class="title">
							<el-icon class="icon-doc"><Document /></el-icon>
							<el-tooltip :content="item.name" :show-after="1000">
								<span class="name" :style="nameStyle">{{ item.name }}</span>
							</el-tooltip>
							<div v-if="item.isTop" class="top">置顶</div>
							<el-icon v-if="item.isStar" class="icon-star"><StarFilled /></el-icon>
						</div>
						<div class="date">{{ item.date }}</div>
					</li>
				</ul>
			</div>
		</template>
		<template v-slot:right>
			<div class="content">
				<docHead class="head" :data="activeItem" @updateMdName="updateMdName" @star="star" @toTop="toTop" @del="del"></docHead>
				<router-view class="view"></router-view>
			</div>
		</template>
	</dz-split>
</template>

<style lang="less" scoped>
.main {
	height: 100%;
	overflow: auto;
	.left {
		overflow: auto;
		border-right: 1px solid #ccc;
		.filter {
			margin: 20px 0 20px 10px;
			.input {
				width: 80%;
				padding-right: 12px;
				/deep/ .el-input__wrapper {
					border-radius: 16px;
				}
			}
		}
		.menu {
			padding-left: 0;
			margin: 0;
			li {
				position: relative;
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
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.icon-doc {
						font-size: 18px;
						padding-right: 10px;
						color: #2f74ed;
					}
					.top {
						position: absolute;
						right: 30px;
						top: 18px;
						height: 15px;
						line-height: 15px;
						font-size: 12px;
						background: #f54e312b;
						color: #f46540;
					}
					.icon-star {
						position: absolute;
						right: 10px;
						top: 16px;
						font-size: 18px;
						color: #fcd900;
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
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		.head {
			padding: 20px 40px;
			border-bottom: 1px solid #eee;
		}
		.view {
			overflow: auto;
		}
	}
}
</style>
