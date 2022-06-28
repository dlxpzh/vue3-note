<template>
	<div class="page">
		<div class="user">
			<img class="avatar cursor" ref="img" :src="user.avatar" width="50" @click="toUrl('introduce')" />
			<div class="info">
				<p class="name">{{ user.name }}</p>
				<p class="alias">{{ user.alias }}</p>
				<p class="adage">{{ user.adage }}</p>
			</div>
		</div>
		<div class="time">
			<div class="date">{{ dateTime.date }}</div>
			<div class="date">{{ dateTime.week }}</div>
			<div class="date">{{ time }}</div>
			<el-popover placement="right-end" :width="200" offset="-20" popper-class="popover" @before-enter="getWeather">
				<template #reference>
					<h4 class="address cursor" @click="toUrl('map')">{{ dateTime.address }}</h4>
				</template>
				<div class="weather">
					<div class="wea">
						<el-icon class="wea-icon" :class="weather.wea_img"><component class="icon" :is="weather.icon" /></el-icon><span class="wea-name">{{ weather.wea }}</span>
					</div>
					<p class="tem"><span class="name">气温</span>{{ weather.tem }}℃（{{ weather.tem_night }}℃ ~ {{ weather.tem_day }}℃）</p>
					<p><span class="name">风向</span>{{ weather.win }}</p>
					<p><span class="name">风力</span>{{ weather.win_speed }}</p>
					<p><span class="name">风速</span>{{ weather.win_meter }}</p>
					<p>
						<span class="name">空气质量</span>{{ weather.air }} <el-tag :type="['success', 'primary', 'info', 'warning', 'danger'][weather.airData.type]">{{ weather.airData.name }}</el-tag>
					</p>
					<p><span class="name">湿度</span>{{ weather.humidity }}</p>
				</div>
			</el-popover>
		</div>
	</div>
</template>
<script>
import { defineComponent, reactive, ref, onMounted, inject, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import { weaIcon, airQuality } from './common';

export default defineComponent({
	setup() {
		const user = reactive({
			name: 'Dlxpzh',
			alias: '帝致爱华',
			avatar: '/src/assets/logo.png',
			adage: '低姿态的心态，写高姿态的代码',
		});
		let weather = ref({
			airData: {},
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
		const toUrl = inject('toUrl');
		// 获取当前天气
		const instance = getCurrentInstance();
		const $axios = instance.appContext.config.globalProperties.$axios;
		const getWeather = () => {
			if (weather.value && Object.keys(weather.value).length > 1) {
				return;
			}
			$axios
				.get('https://v0.yiketianqi.com/free/day', {
					params: {
						appid: '83682799',
						appsecret: 'xAqL7lZe',
						version: 'v61',
						cityid: '101280601',
						city: '深圳',
						vue: '1',
					},
				})
				.then(res => {
					weather.value = res.data;
					weather.value.icon = weaIcon[res.data.wea_img];
					weather.value.airData = airQuality(res.data.air);
				});
		};
		return {
			user,
			dateTime,
			time,
			toUrl,
			weather,
			getWeather,
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
			font-size: 14px;
			font-family: Arial, Helvetica, sans-serif;
		}
		.address {
			color: #888;
		}
	}
	.cursor {
		cursor: pointer;
	}
}
.popover {
	background: red;
	.weather {
		.name {
			padding-right: 8px;
			color: #aaa;
		}
		.wea {
			position: relative;
			.wea-icon {
				font-size: 30px;
			}
			.wea-name {
				position: absolute;
				top: 5px;
				left: 36px;
				font-size: 16px;
			}
		}
		.tem {
			margin-top: 6px;
		}
		.yun {
			color: #ccc;
		}
		.qing {
			color: #ff0;
		}
		.lei {
			color: #666;
		}
		.yu {
			color: #888;
		}
	}
}
</style>
