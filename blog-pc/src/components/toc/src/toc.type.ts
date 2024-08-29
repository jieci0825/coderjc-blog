export interface TocItem {
	id: number
	label: string
	count?: number // 数量统计
	children?: TocItem[] | null
}

export interface TocNode extends TocItem {
	level: number
	isLeaf: boolean
	raw: TocItem
	children: TocNode[] | null
	isActive: boolean
}

export interface TocProps {
	title: string
	tocList: TocItem[]
	isMarker?: boolean // 是否显示标记
	iconfontName?: string // iconfont 图标名称
	isAnchor?: boolean // 是否开启锚点
	scrollTarget?: string // css 元素选择器
}

export interface TocEmits {
	(e: 'click', item: TocItem, event: MouseEvent): void
}

export interface TocItemWrapProps {
	tocItem: TocNode
	retract?: number // 缩进
}
