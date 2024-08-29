import request from '@/apis/request'
import type { IBaseType, IBaseListType } from '../types'
import type { CreateDailyQuoteParams, editDailyQuoteParams, DailyQuoteItem, GetDailyQuoteListParams } from './type.ts'

const PREFIX = '/daily-quote'

/**
 * 创建每日一言
 */
export const reqCreateDailyQuote = (data: CreateDailyQuoteParams) => {
	return request.post<IBaseType<string>>({ url: `${PREFIX}`, data })
}

/**
 * 编辑每日一言
 */
export const reqEditDailyQuote = (data: editDailyQuoteParams) => {
	return request.put<IBaseType<string>>({ url: `${PREFIX}`, data })
}

/**
 * 获取每日一言列表
 */
export const reqGetDailyQuoteList = (params: GetDailyQuoteListParams) => {
	return request.get<IBaseListType<DailyQuoteItem>>({ url: `${PREFIX}`, params })
}

/**
 * 删除每日一言
 */
export const reqDeleteDailyQuote = (id: number) => {
	return request.delete<IBaseType<string>>({ url: `${PREFIX}/${id}` })
}
