import { createRouter, createWebHistory } from 'vue-router'
import nprogress from 'nprogress'

import routePublic from './route-public'
import setTitle from '@/utils/set-title'
import { useGlobalActions, useGlobalGetters } from '@/store'

// 关闭进度条加载器
nprogress.configure({ showSpinner: false })

const router = createRouter({
	history: createWebHistory(),
	routes: routePublic
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
	// 进度条加载器
	nprogress.start()

	const { getToken } = useGlobalGetters()

	// 登录
	if (getToken.value) {
		// debugger
		// 登录状态不允许进入登录页面
		if (to.path === '/login') {
			next({ path: from.path, query: { ...from.query } })
		}
		// 其余页面正常访问
		else {
			next()
		}
	}
	// 未登录
	else {
		if (to.path === '/login') {
			next()
		} else {
			const { logout } = useGlobalActions()
			logout()
		}
	}
})

// 全局后置守卫
router.afterEach(to => {
	nprogress.done()
	if (to.meta.title) {
		setTitle.setRouteTitle(to.meta.title as string)
	}
})

export default router
