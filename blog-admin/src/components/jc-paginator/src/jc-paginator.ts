export interface JcPaginatorProps {
	pageSizes?: number[]
	total: number
	layout?: string
	background?: boolean
}

export interface JcPaginatorEmits {
	(e: 'page-change', page: number): void
	(e: 'size-change', size: number): void
}
