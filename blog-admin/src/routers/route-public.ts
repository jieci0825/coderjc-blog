import type { RouteRecordRaw } from 'vue-router'

const routePublic: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'layout',
		redirect: '/home',
		component: () => import('@/layout/index.vue'),
		children: []
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/login/index.vue')
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'not-found',
		component: () => import('@/views/not-found/index.vue'),
		meta: {
			title: '404'
		}
	}
]

export default routePublic
