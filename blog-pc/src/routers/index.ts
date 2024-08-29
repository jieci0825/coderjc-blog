import nprogress from 'nprogress'
import routes from './routes'
import setTitle from '@/utils/set-title'
import { useGlobalGetters } from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import { openTipMessageBox } from '@/utils'

const loginPageName = ['my-center']

// 关闭进度条加载器
nprogress.configure({ showSpinner: false })

const router = createRouter({
	history: createWebHistory(),
	routes: routes
})

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
	// 进度条加载器
	nprogress.start()
	const { getToken } = useGlobalGetters()
	if (getToken.value) {
		if (to.path === '/login' || to.path === '/register') {
			next({ path: from.path, query: { ...from.query } })
		} else {
			next()
		}
	} else {
		if (loginPageName.includes(to.name as string)) {
			await openTipMessageBox({
				message: '您尚未登录，无法访问，是否需要登录?',
				cancelButtonText: '暂不登录',
				confirmButtonText: '立即登录'
			})
			next({ path: '/login', query: { redirect: to.fullPath } })
		} else {
			next()
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
