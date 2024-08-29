export enum EPlayMode {
	LIST_LOOP = 'list-loop', // 列表循环
	RANDOM = 'random', // 随机播放
	SINGLE = 'single' // 单曲循环
}

export enum EPlayFooterAction {
	PLAYER_STYLE = 'player-style',
	PLAY_SONG_LIST = 'play-song-list'
}

export type PlayFooterActionType = (typeof EPlayFooterAction)[keyof typeof EPlayFooterAction]

export type AlbumModeType = 'album' | 'square'
export enum EMusicPlayerStyle {
	PLAIN_BAR = 'plain-bar',
	FERVENT_BAR = 'fervent-bar',
	NONE = 'none'
}
export type MusicEffectType = (typeof EMusicPlayerStyle)[keyof typeof EMusicPlayerStyle]

export interface LyricItem {
	time: number
	lrc: string
}

export type PlayFooterConfig =
	| 'play'
	| 'prev'
	| 'next'
	| 'volume'
	| 'play-mode'
	| 'player-style'
	| 'song-list'
	| 'lyric'
	| 'play-progress'
