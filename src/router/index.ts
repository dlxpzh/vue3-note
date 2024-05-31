import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '',
		name: 'home',
		component: () => import('../pages/home/index.vue'),
	},
	{
		path: '/home',
		name: 'home',
		component: () => import('../pages/home/index.vue'),
		children: [
			{
				path: 'introduce',
				name: 'introduce',
				component: () => import('../pages/home/introduce.vue'),
			},
			{
				path: 'map',
				name: 'map',
				component: () => import('../pages/home/map.vue'),
			},
			{
				path: 'weather',
				name: 'weather',
				component: () => import('../pages/home/weather.vue'),
			},
			{
				path: 'three',
				name: 'three',
				component: () => import('../pages/three/index.vue'),
			},
		],
	},
	{
		path: '/doc',
		name: 'doc',
		component: () => import('../pages/doc/index.vue'),
		children: [
			{
				path: 'add',
				name: 'add',
				component: () => import('../pages/doc/add.vue'),
			},
			{
				path: 'typescript',
				name: 'typescript',
				component: () => import('../pages/doc/typescript/index.vue'),
			},
			{
				path: 'less',
				name: 'less',
				component: () => import('../pages/doc/less/index.vue'),
			},
			{
				path: 'optimize',
				name: 'optimize',
				component: () => import('../pages/doc/optimize/index.vue'),
			},
			{
				path: 'chrome-analyze',
				name: 'chrome-analyze',
				component: () => import('../pages/doc/analyze/index.vue'),
			},
			{
				path: 'npm',
				name: 'npm',
				component: () => import('../pages/doc/npm/index.vue'),
			},
			{
				path: 'wxpay',
				name: 'wxpay',
				component: () => import('../pages/doc/wxpay/index.vue'),
			},
		],
	},
	{
		path: '/note',
		name: 'note',
		component: () => import('../pages/note/index.vue'),
		children: [
			{
				path: 'question',
				name: 'question',
				// @ts-ignore
				component: () => import('../pages/note/question.md'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
