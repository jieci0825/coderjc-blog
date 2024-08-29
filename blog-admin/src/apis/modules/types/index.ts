export interface IBaseType<T = any> {
	errorCode: number | string
	msg: string
	data: T
}

export interface IBaseListType<T = any> {
	errorCode: number | string
	msg: string
	data: {
		total: number
		list: T[]
	}
}

export interface IPageParams {
	page: number
	pageSize: number
}
