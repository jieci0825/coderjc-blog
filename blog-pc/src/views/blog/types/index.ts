import type { BlogItem } from '@/apis/modules/blog/type'

export interface BlogSkeletonProps {
	loading: boolean
}

export interface BlogContentProps {
	blogList: BlogItem[]
	loadingSkeleton: boolean
	total: number
}

export interface BlogContentEmits {
	(e: 'onPage', page: number): void
	(e: 'onPageSize', pageSize: number): void
}

export interface BlogSidebarProps {
	categoryId: number | undefined
}
