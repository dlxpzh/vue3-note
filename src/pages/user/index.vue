<template>
	<div class="page">
		<div class="user">
			<img class="avatar" ref="img" :src="user.avatar" width="100" />
			<div class="info">
				<p class="name">{{ user.name }}</p>
				<p class="alias">笔名: {{ user.alias }}</p>
				<p class="adage">低姿态的心态，写高姿态的代码</p>
				<p class="adage">人生不是关于如何挺过暴风雨，而是关于如何在暴风雨中翩翩起舞</p>
			</div>
		</div>
		<div class="time">
			<h2>{{ dateTime.date }}</h2>
			<h3>{{ dateTime.week }}</h3>
			<h3>{{ time }}</h3>
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
			date: dayjs().format('YYYY-MM-DD'),
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
	flex-direction: column;
	height: 100%;
	.user {
		flex: 3;
		padding-top: 20px;
		text-align: center;
		.info {
			.name {
				font-size: 22px;
			}
			.alias {
				font-size: 14px;
			}
			.adage {
				margin: 40px 0;
				line-height: 30px;
				border-bottom: 1px solid rgb(155, 105, 170);
			}
		}
	}
	.time {
		flex: 1;
		text-align: center;
		color: #333;
		.address {
			color: #888;
		}
	}
}
</style>
