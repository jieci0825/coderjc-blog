import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 创建拦截器 hooks 接口
//  - 接口接受泛型
export interface JcRequestInterceptors<T = AxiosResponse> {
	// 请求成功拦截
	requestInterceptor?: (config: AxiosRequestConfig) => any
	// 请求错误拦截
	requestInterceptorsCatch?: (error: any) => any
	// 响应成功拦截
	responseInterceptor?: (res: T) => T
	// 响应失败拦截
	responseInterceptorsCatch?: (error: any) => any
}

export interface JcRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
	interceptors?: JcRequestInterceptors<T>
	showLoading?: boolean
}
