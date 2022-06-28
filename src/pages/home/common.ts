export const weaIcon = {
	yun: 'MostlyCloudy',
	qing: 'Sunny',
	yin: 'PartlyCloudy',
	lei: 'Lightning',
	yu: 'Pouring',
};
export const airQuality = (val: number) => {
	if (val > 0 && val <= 50) {
		return {
			name: '优',
			type: 0,
		};
	}
	if (val > 50 && val <= 100) {
		return {
			name: '良',
			type: 1,
		};
	}
	if (val > 100 && val <= 150) {
		return {
			name: '轻度污染',
			type: 2,
		};
	}
	if (val > 150 && val <= 200) {
		return {
			name: '中度污染',
			type: 3,
		};
	}
	if (val > 200 && val <= 300) {
		return {
			name: '重度污染',
			type: 4,
		};
	}
	if (val > 300) {
		return {
			name: '严重污染',
			type: 4,
		};
	}
};
