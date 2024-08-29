import type { JcFormProps } from '@/components/jc-form'
import type { JcPaginatorProps } from '@/components/jc-paginator'
import type { JcTableConfig } from '@/components/jc-table'

export interface PageContentConfig {
	request?: (params: any) => Promise<any> // 请求数据的 api
	formatRespData?: (data: any) => any // 格式化请求到数据的函数
	respCallback?: (data: any) => void // 请求成功后的回调函数
	immediate?: true
	listField?: string
	totalField?: string
	queryParams?: object
}

export interface PageContentProps {
	tableData?: any[]
	formConfig?: JcFormProps
	tableConfig: JcTableConfig
	paginatorConfig?: JcPaginatorProps | any
	isPaginator?: boolean
	usePageContent?: PageContentConfig
	isAction?: boolean
}

export interface PageConteEmits {
	(e: 'search'): void
	(e: 'actCreate'): void
	(e: 'handleTableEdit', row: any): void
	(e: 'handleTableDelete', row: any): void
}
