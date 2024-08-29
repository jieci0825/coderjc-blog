import type { IPageParams } from '../types'

export interface CreateDailyQuoteParams {
	content: string
	author: string
}

export interface DailyQuoteItem extends CreateDailyQuoteParams {
	id: number
}

export interface editDailyQuoteParams extends DailyQuoteItem {}

export interface GetDailyQuoteListParams extends IPageParams {
	content?: string
}
