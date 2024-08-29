// 导入 axios 实例
import axios from 'axios'
// 导入 axios 内部封装的类型
import type { AxiosInstance } from 'axios'
// 导入自定义类型
import type { JcRequestInterceptors, JcRequestConfig } from './type'

class JcRequest {
	instance: AxiosInstance
	interceptors?: JcRequestInterceptors

	constructor(config: JcRequestConfig) {
		this.instance = axios.create(config)
		this.interceptors = config.interceptors

		// 注册请求拦截
		this.instance.interceptors.request.use(
			this.interceptors?.requestInterceptor,
			this.interceptors?.requestInterceptorsCatch
		)

		// 注册响应拦截
		this.instance.interceptors.response.use(
			this.interceptors?.responseInterceptor,
			this.interceptors?.responseInterceptorsCatch
		)

		// 添加通用请求拦截器
		this.instance.interceptors.request.use(
			config => {
				return config
			},
			err => {
				return err
			}
		)

		// 添加通用响应拦截器
		this.instance.interceptors.response.use(
			resp => {
				return resp
			},
			err => {
				return Promise.reject(err)
			}
		)
	}

	// 请求方法
	request<T>(config: JcRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 针对单一的请求做出拦截器配置
			if (config.interceptors?.requestInterceptor) {
				// 如果存在则调用配置的拦截器改变 config
				config = config.interceptors.requestInterceptor(config)
			}

			this.instance.request<any, T>(config).then(
				res => {
					// 如果存在单一的响应拦截器配置也做出转化
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res)
					}
					resolve(res)
				},
				err => {
					reject(err)
				}
			)
		})
	}

	get<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}

	post<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}

	put<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PUT' })
	}

	delete<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}
}

export default JcRequest
