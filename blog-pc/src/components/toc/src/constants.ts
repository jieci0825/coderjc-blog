import type { InjectionKey, Ref } from 'vue'
import type { TocNode } from './toc.type'

interface ITocKey {
	clickEvent: (tocItem: TocNode, evt: MouseEvent) => void
	iconfontName?: string // iconfont 图标名称
	isMarker?: boolean // 是否使用 marker
	isAnchor?: boolean // 是否使用锚点
	curAnchorId?: Ref<string> // 当前锚点 id
}

export const TocKey: InjectionKey<ITocKey> = Symbol('TocKey')
