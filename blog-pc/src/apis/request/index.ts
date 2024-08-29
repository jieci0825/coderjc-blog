import axios from 'axios'
import router from '@/routers'
import JcRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { getLocalCache, setLocalCache } from '@/utils'
import { BLOG_REFRESH_TOKEN, BLOG_TOKEN } from '@/constants'

const refreshIns = axios.create()

const jcRequest: JcRequest = new JcRequest({
	baseURL: BASE_URL,
	timeout: TIME_OUT,
	showLoading: false,
	interceptors: {
		requestInterceptor: config => {
			const token = getLocalCache(BLOG_TOKEN)
			if (token) config.headers && (config.headers.Authorization = token)
			return config
		},
		responseInterceptor(res) {
			return res.data
		},
		async responseInterceptorsCatch(error) {
			const originRequest = error.config
			const errInfo = error.response?.data
			console.log('errInfo: ', errInfo)
			if (errInfo) {
				// 如果自定义错误码为 9999 则表示 token 令牌过期重新获取 token 令牌
				if (!originRequest._retry && errInfo.errorCode === 9999) {
					try {
						// 给原始请求添加重新请求标记-保证不会反复获取令牌
						originRequest._retry = true

						// 使用新的实例发送请求获取令牌
						const _response = await refreshIns.get(`${BASE_URL}/token/refresh`, {
							headers: {
								'refresh-authorization': getLocalCache(BLOG_REFRESH_TOKEN) || ''
							}
						})

						const { accessToken, refreshToken } = _response.data.data

						// 重新本地存储的令牌
						setLocalCache(BLOG_TOKEN, accessToken)
						setLocalCache(BLOG_REFRESH_TOKEN, refreshToken)

						// 获取到新的访问令牌之后重新发送上一次的请求
						return jcRequest.instance(originRequest)
					} catch (error) {
						ElMessageBox.confirm('登录过期，是否需要重新登录？', '提示', {
							confirmButtonText: '登录',
							cancelButtonText: '暂不登录',
							type: 'warning'
						})
							.then(() => {
								router.push(`/login?redirect=${router.currentRoute.value.fullPath}`)
							})
							.catch()
					}
				} else {
					ElMessage.error(errInfo.msg)
				}
			}
			return Promise.reject(error)
		}
	}
})

export default jcRequest
