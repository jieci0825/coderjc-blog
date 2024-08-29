import { LAYOUT_MODE } from '@/constants'
import type { AlbumModeType, MusicEffectType } from '@/views/music/music-song/types'

export type LayoutModeType = (typeof LAYOUT_MODE)[keyof typeof LAYOUT_MODE]

export interface GlobalConfig {
	isCollapse: boolean
	isAccordion: boolean
	routeAnimation: string
	asideWidth: number
	grayMode: boolean
	colorWeakness: boolean
	layoutMode: LayoutModeType
}

export interface MusicConfig {
	albumMode: AlbumModeType
	musicEffect: MusicEffectType
	volume: number
	isMute: boolean
}
