import { computed } from 'vue'
import { piniaMusicStore } from '../modules/music'
import { formatLrc } from '@/utils'
import type { LyricItem } from '@/components/player'

export const useMusicGetters = () => {
	const globalStore = piniaMusicStore()

	// 唱片模式
	const getAlbumMode = computed(() => globalStore.albumMode)
	// 音乐动效
	const getMusicEffect = computed(() => globalStore.musicEffect)
	// 获取音量
	const getVolume = computed(() => globalStore.volume)
	// 是否静音
	const getIsMute = computed(() => globalStore.isMute)
	// 获取播放模式
	const getPlayMode = computed(() => globalStore.playMode)
	// 获取歌词显示
	const getLyricVisible = computed(() => globalStore.lyricVisible)
	// 获取歌词行数
	const getLyricRows = computed(() => globalStore.lyricRows)
	// 获取歌词字体大小
	const getLyricFontSize = computed(() => globalStore.lyricFontSize)
	// 获取歌词锁定
	const getLyricLock = computed(() => globalStore.lyricLock)
	// 获取歌词方向
	const getLyricDirection = computed(() => globalStore.lyricDirection)

	// 获取播放器显示
	const getPlayerVisible = computed(() => globalStore.playerVisible)
	// 是否播放
	const getIsPlay = computed(() => globalStore.isPlay)
	// 获取当前播放歌曲
	const getCurPlaySong = computed(() => globalStore.curPlaySong)
	// 获取当前播放歌曲列表
	const getCurPlaySongList = computed(() => globalStore.curPlaySongList)
	// 获取当前播放歌曲的歌词列表
	const getCurPlaySongLyricList = computed<LyricItem[]>(() => formatLrc(getCurPlaySong.value?.lyric || '') || [])
	// 当前激活歌词的索引
	const getCurLyricActiveIndex = computed(() => globalStore.curLyricActiveIndex)
	// 获取当前播放歌曲的秒数
	const getCurPlaySongSec = computed(() => globalStore.curPlaySongSec)
	// 获取当前播放歌曲的总秒数
	const getCurPlaySongTotalSec = computed(() => globalStore.curPlaySongTotalSec)

	return {
		getPlayerVisible,
		getIsPlay,
		getAlbumMode,
		getMusicEffect,
		getVolume,
		getIsMute,
		getCurPlaySong,
		getCurPlaySongList,
		getCurPlaySongLyricList,
		getPlayMode,
		getLyricVisible,
		getLyricRows,
		getLyricFontSize,
		getCurLyricActiveIndex,
		getCurPlaySongSec,
		getCurPlaySongTotalSec,
		getLyricLock,
		getLyricDirection
	}
}

export const useMusicActions = () => {
	const {
		setPlayerVisible,
		setAlbumMode,
		setMusicEffect,
		setVolume,
		setMute,
		setCurPlaySong,
		setCurPlaySongList,
		setIsPlay,
		setPlayMode,
		switchSong,
		setLyricVisible,
		setLyricRows,
		setLyricLock,
		setLyricFontSize,
		setCurLyricActiveIndex,
		setCurPlaySongSec,
		setCurPlaySongTotalSec,
		setLyricDirection
	} = piniaMusicStore()

	return {
		setPlayerVisible,
		setAlbumMode,
		setMusicEffect,
		setVolume,
		setMute,
		setCurPlaySong,
		setCurPlaySongList,
		setIsPlay,
		setPlayMode,
		switchSong,
		setLyricVisible,
		setLyricRows,
		setLyricLock,
		setLyricFontSize,
		setCurLyricActiveIndex,
		setCurPlaySongSec,
		setCurPlaySongTotalSec,
		setLyricDirection
	}
}
