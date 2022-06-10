import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: '',
        name: 'home',
        component: () => import('../pages/home/index.vue')
    },
    {
        path: '/home',
        name: 'home',
        component: () => import('../pages/home/index.vue')
    },
    {
        path: '/doc',
        name: 'doc',
        component: () => import('../pages/doc/index.vue'),
        children: [
            {
                path: 'typescript',
                name: 'typescript',
                // @ts-ignore
                component: () => import('../pages/doc/typescript.md')
            },
            {
                path: 'less',
                name: 'less',
                // @ts-ignore
                component: () => import('../pages/doc/less.md')
            },
            {
                path: 'optimize',
                name: 'optimize',
                // @ts-ignore
                component: () => import('../pages/doc/optimize.md')
            },
            {
                path: 'chrome-analyze',
                name: 'chrome-analyze',
                // @ts-ignore
                component: () => import('../pages/doc/chrome-analyze.md')
            },
        ]
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
                component: () => import('../pages/note/question.md')
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router