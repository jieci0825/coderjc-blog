import request from '@/apis/request'
import type {
	AuthorInfo,
	GetCaptchaParams,
	LoginParams,
	LoginParamsResp,
	SiteHomeInfo,
	GetCredentialResp,
	CreateFileRecordParams,
	DailyQuoteItem
} from './type.ts'
import type { IBaseType } from '../types'

/**
 * 登录
 */
export function reqLogin(data: LoginParams) {
	return request.post<IBaseType<LoginParamsResp>>({ url: '/token', data })
}

/**
 * 获取作者信息
 */
export function reqGetAuthorInfo() {
	return request.get<IBaseType<AuthorInfo>>({ url: '/global/auhtor' })
}

/**
 * 获取验证码
 */
export function reqGetCaptcha(params: GetCaptchaParams) {
	return request.get<IBaseType<string>>({ url: '/token/captcha', params })
}

/**
 * 获取站点首页信息
 */
export function reqGetSiteHomeInfo() {
	return request.get<IBaseType<SiteHomeInfo>>({ url: '/global/site-home-info' })
}

/**
 * 获取临时凭证
 */
export function reqGetUploadCredential() {
	return request.get<IBaseType<GetCredentialResp>>({ url: '/global/credential' })
}

/**
 * 创建文件记录
 */
export function reqCreateFileRecord(data: CreateFileRecordParams | CreateFileRecordParams[]) {
	return request.post<IBaseType<number[]>>({ url: `/global/record`, data })
}

/**
 * 访问站点
 */
export function reqVisitSite() {
	return request.get<IBaseType<string>>({ url: '/global/visit' })
}

/**
 * 获取每日一言
 */
export function reqGetDailyQuote() {
	return request.get<IBaseType<DailyQuoteItem>>({ url: '/global/daily-quote' })
}
