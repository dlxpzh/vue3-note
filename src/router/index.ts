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
                component: () => import('../pages/doc/typescript.md')
            },
            {
                path: 'less',
                name: 'less',
                component: () => import('../pages/doc/less.md')
            },
            {
                path: 'less',
                name: 'less',
                component: () => import('../pages/doc/optimize.md')
            },
            {
                path: 'less',
                name: 'less',
                component: () => import('../pages/doc/chrome-analyze.md')
            },
        ]
    },
    {
        path: '/note',
        name: 'note',
        component: () => import('../pages/note/index.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router