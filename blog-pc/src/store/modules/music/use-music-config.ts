import { reactive, watch } from 'vue'
import { BLOG_MUSIC_CONFIG } from '@/constants'
import { getLocalCache, setLocalCache } from '@/utils'
import { EMusicPlayerStyle, EPlayMode, type AlbumModeType, type MusicEffectType } from '@/components/player'
import type { LyricDirectionType, MusicConfig } from './type'

export function useMusicConfig() {
	// 全局音乐配置
	const defaultMusicConfig: MusicConfig = {
		albumMode: 'album',
		musicEffect: EMusicPlayerStyle.PLAIN_BAR,
		volume: 70,
		isMute: false,
		playMode: EPlayMode.LIST_LOOP,
		lyricVisible: false,
		lyricFontSize: 30,
		lyricLock: false,
		lyricDirection: 'horizontal',
		lyricRows: 2
	}
	const musicConfig = reactive<MusicConfig>(Object.assign(defaultMusicConfig, getLocalCache(BLOG_MUSIC_CONFIG) || {}))

	// 设置唱片展示模式
	function setAlbumMode(mode: AlbumModeType) {
		musicConfig.albumMode = mode
	}
	// 设置音乐效果
	function setMusicEffect(effect: MusicEffectType) {
		musicConfig.musicEffect = effect
	}
	// 设置音量
	function setVolume(volume: number) {
		musicConfig.volume = volume
	}
	// 设置静音
	function setMute(isMute: boolean) {
		musicConfig.isMute = isMute
	}
	// 设置播放模式
	const setPlayMode = (mode: EPlayMode) => {
		musicConfig.playMode = mode
	}
	// 设置歌词显示
	const setLyricVisible = (visible?: boolean) => {
		if (visible === undefined) {
			musicConfig.lyricVisible = !musicConfig.lyricVisible
		} else {
			musicConfig.lyricVisible = visible
		}
	}
	// 歌词字体大小
	const setLyricFontSize = (size: number) => {
		if (size < 12 || size > 30) return
		musicConfig.lyricFontSize = size
	}
	// 歌词锁定
	const setLyricLock = (lock: boolean) => {
		musicConfig.lyricLock = lock
	}
	// 歌词行数
	const setLyricRows = (rows: number) => {
		musicConfig.lyricRows = rows
	}
	// 歌词方向
	const setLyricDirection = (direction: LyricDirectionType) => {
		musicConfig.lyricDirection = direction
	}

	watch(
		() => musicConfig,
		() => storageMusicConfig(),
		{ deep: true, immediate: true }
	)

	function storageMusicConfig() {
		setLocalCache(BLOG_MUSIC_CONFIG, musicConfig)
	}

	return {
		musicConfig,
		setAlbumMode,
		setMusicEffect,
		setVolume,
		setMute,
		setPlayMode,
		setLyricVisible,
		setLyricFontSize,
		setLyricLock,
		setLyricRows,
		setLyricDirection
	}
}
