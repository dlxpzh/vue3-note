<template>
	<div class="content">
		<h2>{{ dateTime.date }}</h2>
		<h2>{{ dateTime.week }}</h2>
		<h3>{{ time }}</h3>
		<h4 class="address">{{ dateTime.address }}</h4>
	</div>
</template>
<script>
import dayjs from 'dayjs';
import { ref, defineComponent, onMounted } from 'vue';

export default defineComponent({
	setup() {
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
		// 2022年的每个月10号是星期几
		const findWeekOfTenDay = () => {
			let result = [],
				date = dayjs().startOf('year');
			const weeks = ['日', '一', '二', '三', '四', '五', '六'];
			while (dayjs(date).isBefore(dayjs().endOf('year'), 'date')) {
				if (date.$D === 10) {
					const week = weeks[date.day()];
					result.push(`日期${date.format('YYYY-MM-DD')}是星期${week}`);
				}
				date = date.add(1, 'day');
			}
			return result;
		};
		return {
			dateTime,
			time,
		};
	},
});
</script>
<style lang="less" scoped>
.content {
	position: absolute;
	right: 30px;
	bottom: 100px;
	text-align: center;
	.address {
		color: #888;
	}
}
</style>
