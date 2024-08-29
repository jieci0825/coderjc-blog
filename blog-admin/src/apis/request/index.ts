import JcRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { getLocalCache } from '@/utils'
import { BLOG_ADMIN_TOKEN } from '@/constants'
import { useGlobalActions } from '@/store'

const jcRequest: JcRequest = new JcRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	showLoading: false,
	interceptors: {
		requestInterceptor: config => {
			const token = getLocalCache(BLOG_ADMIN_TOKEN)
			if (token) {
				config.headers && (config.headers.Authorization = token)
			}
			return config
		},
		responseInterceptor(res) {
			return res.data
		},
		async responseInterceptorsCatch(error) {
			const errInfo = error.response?.data
			console.log('🚢 ~ 当前打印的内容 ~ errInfo:', errInfo)
			ElMessage.error(errInfo.msg)
			if (errInfo?.errorCode === 9999) {
				const { logout } = useGlobalActions()
				logout()
			}
			return Promise.reject(error) // 抛出错误，让调用者处理
		}
	}
})

export default jcRequest
