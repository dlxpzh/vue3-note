<template>
	<div class="page">
		<div class="user">
			<img class="avatar" ref="img" :src="user.avatar" width="50" />
			<div class="info">
				<p class="name">{{ user.name }}</p>
				<p class="alias">笔名: {{ user.alias }}</p>
				<p class="adage">低姿态的心态，写高姿态的代码</p>
			</div>
		</div>
		<div class="time">
			<div class="date">{{ dateTime.date }}</div>
			<div class="date">{{ dateTime.week }}</div>
			<div class="date">{{ time }}</div>
			<h4 class="address">{{ dateTime.address }}</h4>
		</div>
	</div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted } from 'vue';
import dayjs from 'dayjs';

export default defineComponent({
	setup() {
		const user = reactive({
			name: 'Dlxpzh',
			alias: '帝致爱华',
			avatar: '/src/assets/logo.png',
		});
		const weeks = ['日', '一', '二', '三', '四', '五', '六'];
		const dateTime = {
			date: dayjs().format('YYYY/MM/DD'),
			week: '星期' + weeks[dayjs().day()],
			address: '中国·深圳',
		};
		const time = ref('');
		onMounted(() => {
			setInterval(() => {
				time.value = dayjs().format('HH:mm:ss');
			});
		});
		return {
			user,
			dateTime,
			time,
		};
	},
});
</script>
<style lang="less" scoped>
.page {
	display: flex;
	height: 100%;
	flex-direction: column;
	overflow: hidden;
	text-align: center;
	.user {
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;
		.info {
			.name {
				font-size: 20px;
			}
			.alias {
				font-size: 12px;
			}
			.adage {
				font-size: 14px;
				line-height: 22px;
				border-bottom: 1px solid rgb(155, 105, 170);
			}
		}
	}
	.time {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		color: #333;
		.date {
			height: 26px;
			line-height: 26px;
			font-family: Arial, Helvetica, sans-serif;
		}
		.address {
			color: #888;
		}
	}
}
</style>
