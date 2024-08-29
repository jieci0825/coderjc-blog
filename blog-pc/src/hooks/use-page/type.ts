export interface UsePageOptions {
	listField?: string // 定义返回数据中表示列表的字段
	totalField?: string // 定义返回数据中表示总数的字段
	immediate?: boolean // 是否立即触发
	dataCallback?: (data: any) => any // 对返回的数据进行处理
	respAfterCallback?: (data: any) => any // 请求完成之后的处理
	isPage?: boolean // 是否需要添加分页参数
}
