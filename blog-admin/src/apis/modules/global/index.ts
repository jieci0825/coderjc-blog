import request from '@/apis/request'
import type { IBaseType } from '../types'
import type { LoginParams, LoginParamsResp, GetCaptchaParams } from './type.ts'

/**
 * 登录
 */
export function reqLogin(data: LoginParams) {
	return request.post<IBaseType<LoginParamsResp>>({ url: '/token', data })
}

/**
 * 获取验证码
 */
export function reqGetCaptcha(params: GetCaptchaParams) {
	return request.get<IBaseType<string>>({ url: '/token/captcha', params })
}
