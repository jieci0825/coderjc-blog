import { DEFAULT_INDEX_ROUTE_NAME } from '@/constants'
import type { RouteRecordRaw } from 'vue-router'

const routeDynamic: RouteRecordRaw[] = [
	{
		path: '/home',
		name: DEFAULT_INDEX_ROUTE_NAME,
		meta: {
			closable: false
		},
		component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
	},
	{
		path: '/role',
		name: 'role',
		component: () => import(/* webpackChunkName: "role" */ '@/views/role/index.vue')
	},
	{
		path: '/user',
		name: 'user',
		component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue')
	},
	{
		path: '/menu',
		name: 'menu',
		component: () => import(/* webpackChunkName: "menu" */ '@/views/menu/index.vue')
	},
	{
		path: '/blog',
		name: 'blog',
		redirect: '/blog/article'
	},
	{
		path: '/blog/article',
		name: 'blog-article',
		component: () => import(/* webpackChunkName: "blog-article" */ '@/views/blog/blog-article/index.vue')
	},
	{
		path: '/blog/category',
		name: 'blog-category',
		component: () => import(/* webpackChunkName: "blog-category" */ '@/views/blog/blog-category/index.vue')
	},
	{
		path: '/blog/publish',
		name: 'blog-publish',
		component: () => import(/* webpackChunkName: "blog-publish" */ '@/views/blog/blog-publish/index.vue')
	},
	{
		path: '/blog/tag',
		name: 'blog-tag',
		component: () => import(/* webpackChunkName: "blog-tag" */ '@/views/blog/blog-tag/index.vue')
	},
	{
		path: '/comment',
		name: 'comment',
		component: () => import(/* webpackChunkName: "comment" */ '@/views/comment/index.vue')
	},
	{
		path: '/friend-chain/category',
		name: 'friend-chain-category',
		component: () =>
			import(/* webpackChunkName: "friend-chain-category" */ '@/views/friend-chain/friend-chain-category/index.vue')
	},
	{
		path: '/friend-chain/link',
		name: 'friend-chain-link',
		component: () =>
			import(/* webpackChunkName: "friend-chain-link" */ '@/views/friend-chain/friend-chain-link/index.vue')
	},
	{
		path: '/my-center',
		name: 'my-center',
		component: () => import(/* webpackChunkName: "my-center" */ '@/views/my-center/index.vue')
	},
	{
		path: '/log',
		name: 'log',
		component: () => import(/* webpackChunkName: "log" */ '@/views/log/index.vue')
	},
	{
		path: '/music/category',
		name: 'music-category',
		component: () => import(/* webpackChunkName: "music-category" */ '@/views/music/music-category/index.vue')
	},
	{
		path: '/music/song',
		name: 'music-song',
		component: () => import(/* webpackChunkName: "fmusic-song" */ '@/views/music/music-song/index.vue')
	},
	{
		path: '/daily-quote',
		name: 'daily-quote',
		component: () => import(/* webpackChunkName: "daily-quote" */ '@/views/daily-quote/index.vue')
	}
]

export default routeDynamic
