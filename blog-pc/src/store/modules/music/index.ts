import { computed, ref, toRefs } from 'vue'
import { defineStore } from 'pinia'
import { useMusicConfig } from './use-music-config'
import { EPlayMode } from '@/components/player'
import type { MusicCategoryItem, MusicItem } from '@/apis/modules/music/type'

export const piniaMusicStore = defineStore('music', () => {
	const {
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
	} = useMusicConfig()

	// 当前音乐分类id
	const curMusicCategoryId = ref(0)
	const setCurMusicCategoryId = (id: number) => {
		curMusicCategoryId.value = id
	}

	// 音乐分类
	const musicCategory = ref<MusicCategoryItem[]>([])
	const setMusicCategory = (list: MusicCategoryItem[]) => {
		musicCategory.value = list
	}

	// 显示播放器
	const playerVisible = ref(false)
	const setPlayerVisible = (flag?: boolean) => {
		if (flag === undefined) {
			playerVisible.value = !playerVisible.value
		} else {
			playerVisible.value = flag
		}
	}

	// 当前播放歌曲激活歌词索引
	const curLyricActiveIndex = ref(0)
	const setCurLyricActiveIndex = (index: number) => {
		curLyricActiveIndex.value = index
	}

	// 当前播放歌曲列表
	const curPlaySongList = ref<MusicItem[]>([])
	const setCurPlaySongList = (list: MusicItem[]) => {
		curPlaySongList.value = list
	}

	// 当前播放歌曲
	const curPlaySong = ref<MusicItem | undefined>(curPlaySongList.value[0])
	const setCurPlaySong = (song: MusicItem) => {
		setCurLyricActiveIndex(0)
		curPlaySong.value = song
	}

	// 是否播放
	const isPlay = ref(false)
	const setIsPlay = (flag?: boolean) => {
		if (!curPlaySong.value) return ElMessage.warning('请先选择歌曲')

		if (flag === undefined) {
			isPlay.value = !isPlay.value
		} else {
			isPlay.value = flag
		}
	}

	// 当前歌曲播放秒数
	const curPlaySongSec = ref(0)
	const setCurPlaySongSec = (sec: number) => {
		curPlaySongSec.value = sec
	}

	// 当前歌曲总秒数
	const curPlaySongTotalSec = ref(0)
	const setCurPlaySongTotalSec = (sec: number) => {
		curPlaySongTotalSec.value = sec
	}

	const curIndex = computed(() => {
		return curPlaySongList.value.findIndex(item => item.id === curPlaySong.value!.id)
	})

	// 切换歌曲
	const switchSong = (dir: 'prev' | 'next') => {
		if (!curPlaySong.value) return ElMessage.warning('当前暂无播放队列')
		if (curIndex.value === -1) return
		if (musicConfig.playMode === EPlayMode.RANDOM) {
			return randomPlay()
		}
		let index = curIndex.value
		const maxIndex = curPlaySongList.value.length - 1
		if (dir === 'prev') {
			if (curIndex.value === 0) {
				index = maxIndex
			} else {
				index = curIndex.value - 1
			}
		} else if (dir === 'next') {
			if (curIndex.value === maxIndex) {
				index = 0
			} else {
				index = curIndex.value + 1
			}
		}
		setCurPlaySong(curPlaySongList.value[index])
	}

	// 随机播放
	function randomPlay() {
		if (!curPlaySong.value) return ElMessage.warning('当前暂无播放队列')
		const deep = () => {
			const index = Math.floor(Math.random() * curPlaySongList.value.length)
			if (index === curIndex.value) {
				return deep()
			}
			return index
		}
		const index = deep()
		setCurPlaySong(curPlaySongList.value[index])
	}

	return {
		...toRefs(musicConfig),
		curMusicCategoryId,
		setCurMusicCategoryId,
		playerVisible,
		setPlayerVisible,
		musicCategory,
		setMusicCategory,
		isPlay,
		setIsPlay,
		curPlaySong,
		setCurPlaySong,
		curPlaySongList,
		setCurPlaySongList,
		curLyricActiveIndex,
		setCurLyricActiveIndex,
		setAlbumMode,
		setMusicEffect,
		setVolume,
		setMute,
		setPlayMode,
		switchSong,
		randomPlay,
		setLyricVisible,
		setLyricFontSize,
		setLyricLock,
		setLyricRows,
		curPlaySongSec,
		setCurPlaySongSec,
		curPlaySongTotalSec,
		setCurPlaySongTotalSec,
		setLyricDirection
	}
})
