<template>
	<div class="module"></div>
</template>
<script>
import { defineComponent, getCurrentInstance } from 'vue';

export default defineComponent({
	setup() {
		const instance = getCurrentInstance();
		const $axios = instance.appContext.config.globalProperties.$axios;
		const getWeather = () => {
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
					return res.data;
				});
		};
		getWeather();
	},
});
</script>
