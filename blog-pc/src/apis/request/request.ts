// 导入 axios 实例
import axios from 'axios'
// 导入 axios 内部封装的类型
import type { AxiosInstance } from 'axios'
// 导入自定义类型
import type { JcRequestInterceptors, JcRequestConfig } from './type'

class JcRequest {
	// 定义实例
	instance: AxiosInstance
	// 定义拦截器-可选
	interceptors?: JcRequestInterceptors
	// 加载器
	loading: null | any

	constructor(config: JcRequestConfig) {
		this.instance = axios.create(config)
		this.interceptors = config.interceptors
		this.loading = null

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
	//  - 返回的值由泛型确定，即具体返回的值类型由使用者决定
	//  - Promise<T> 可以把这个泛型传递过去，表示这个 Pormise 返回的结果是受这个泛型约束的
	request<T>(config: JcRequestConfig<T>): Promise<T> {
		return new Promise((resolve, reject) => {
			// 针对单一的请求做出拦截器配置
			if (config.interceptors?.requestInterceptor) {
				// 如果存在则调用配置的拦截器改变 config
				config = config.interceptors.requestInterceptor(config)
			}

			// 使用经过一系列操作合成之后的配置发起最终的请求
			//  - 这里约束一下返回的响应结果
			this.instance.request<any, T>(config).then(
				res => {
					// 如果存在单一的响应拦截器配置也做出转化
					if (config.interceptors?.responseInterceptor) {
						res = config.interceptors.responseInterceptor(res)
					}
					// 将结果返回，前面的 request<any, T> 已经确定好了返回的参数类型，所以这里可以直接返回
					resolve(res)
				},
				err => {
					reject(err)
				}
			)
		})
	}

	// 封装 get
	get<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'GET' })
	}

	// 封装 post
	post<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'POST' })
	}

	// 封装 put
	put<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'PUT' })
	}

	// 封装 delete
	delete<T>(config: JcRequestConfig<T>): Promise<T> {
		return this.request<T>({ ...config, method: 'DELETE' })
	}
}

export default JcRequest
