import type { EPlayMode, AlbumModeType, MusicEffectType } from '@/components/player'

export type LyricDirectionType = 'vertical' | 'horizontal'

export interface MusicConfig {
	albumMode: AlbumModeType
	musicEffect: MusicEffectType
	volume: number
	isMute: boolean
	playMode: EPlayMode
	lyricVisible: boolean
	lyricFontSize: number
	lyricLock: boolean
	lyricDirection: LyricDirectionType
	lyricRows: number
}
