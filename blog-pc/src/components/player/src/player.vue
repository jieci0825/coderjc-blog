<script setup lang="ts">
import PlayOverview from './play-overview.vue'
import PlayDetail from './play-detail.vue'
import PlayFooter from './play-footer.vue'
import PlayerStyle from './player-style.vue'
import PlaySongList from './play-song-list.vue'
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { useAudioVisual, useEventListener } from '@/hooks'
import { useMusicActions, useMusicGetters } from '@/store'
import { Close } from '@element-plus/icons-vue'
import { EPlayFooterAction, EPlayMode, type PlayFooterActionType, type PlayFooterConfig } from './player'

const { getCurPlaySong, getIsPlay, getCurPlaySongLyricList, getPlayMode, getCurPlaySongTotalSec } = useMusicGetters()
const {
	setIsPlay,
	switchSong,
	setCurLyricActiveIndex,
	setPlayerVisible,
	setCurPlaySongTotalSec,
	setCurPlaySongSec,
	reqGetMusicCategoryList
} = useMusicActions()
reqGetMusicCategoryList()

const { refs, setRef } = useRefs()

const audioRef = ref<HTMLAudioElement>()

// 监听音乐播放时间，根据进度让对应时间的歌词的下标
function listenerAudio() {
	const audio: HTMLAudioElement = audioRef.value!
	const currentAudioTime = audio.currentTime
	setCurPlaySongSec(currentAudioTime)

	if (currentAudioTime <= 0) return 0
	if (currentAudioTime >= getCurPlaySongTotalSec.value) return getCurPlaySongLyricList.value.length - 1

	const index =
		getCurPlaySongLyricList.value.findIndex(item => {
			return item.time >= currentAudioTime
		}) - 1

	return index < 0 ? getCurPlaySongLyricList.value.length - 1 : index
}

const audioId = '#player'

let retry = false
useEventListener(audioId, 'timeupdate', () => {
	// 为了处理某些移动端时无法再 时获取音频总时长，所以在播放时在确认一次
	if (getCurPlaySongTotalSec.value === 0 && !retry) {
		setCurPlaySongTotalSec(Math.round(audioRef.value!.duration))
		retry = true
	}
	const index = listenerAudio()
	setCurLyricActiveIndex(index)
})

useEventListener(audioId, 'loadedmetadata', () => {
	setCurPlaySongTotalSec(Math.round(audioRef.value!.duration))
})

// 播放完成
useEventListener(audioId, 'ended', () => {
	setCurPlaySongSec(getCurPlaySongTotalSec.value)
	if (getPlayMode.value === EPlayMode.SINGLE) {
		replay()
		return
	} else {
		switchSong('next')
	}
})

watch(
	() => getIsPlay.value,
	newVal => {
		nextTick(() => {
			newVal ? play() : pause()
		})
	}
)

watch(
	() => getCurPlaySong.value,
	() => {
		setIsPlay(true)
		nextTick(() => {
			play()
		})
	}
)

// 重新播放
function replay() {
	setCurPlaySongSec(0)
	const audio: HTMLAudioElement = audioRef.value!
	audio.currentTime = 0
	play()
}

function play() {
	setIsPlay(true)
	audioRef.value!.play()
}

function pause() {
	setIsPlay(false)
	audioRef.value!.pause()
}

const changeProgress = (progress: number) => {
	audioRef.value!.currentTime = (progress / 100) * getCurPlaySongTotalSec.value
	play()
}

const popUpWrap = ref(false)
const popUpComponentName = ref<PlayFooterActionType>(EPlayFooterAction.PLAYER_STYLE)
function onActions(action: PlayFooterActionType) {
	if (action === popUpComponentName.value) {
		popUpWrap.value = !popUpWrap.value
	} else {
		popUpWrap.value = true
	}
	popUpComponentName.value = action
}

let useAudioOpt: any
onMounted(() => {
	nextTick(() => {
		const audioEl = document.querySelector(audioId) as HTMLAudioElement
		audioRef.value = audioEl
		const canvasEL = document.querySelector('#audio-visual-canvas') as HTMLCanvasElement
		useAudioOpt = useAudioVisual(refs.audioVisualRef, audioEl, canvasEL)
	})
})
onUnmounted(() => {
	useAudioOpt.audioOffEvent()
})

useEventListener(document, 'click', () => {
	popUpWrap.value = false
})

const isDetail = ref(false)
const detailFooterConfig: PlayFooterConfig[] = [
	'play-mode',
	'next',
	'play',
	'prev',
	'lyric',
	'volume',
	'player-style',
	'song-list',
	'play-progress'
]
const overviewFooterConfig: PlayFooterConfig[] = ['play-mode', 'next', 'play', 'prev', 'lyric', 'volume', 'song-list']
const footerConfig = computed(() => {
	return isDetail.value ? detailFooterConfig : overviewFooterConfig
})

const handleClose = () => {
	if (isDetail.value) {
		isDetail.value = false
	} else {
		setPlayerVisible(false)
	}
}
</script>

<template>
	<div class="player-mask">
		<div
			class="player-wrapper"
			title="">
			<div class="header-wrap">
				<span class="title">{{ isDetail ? '歌曲详情' : '歌曲概览' }}</span>
				<div class="right">
					<el-icon
						@click="handleClose"
						:size="24"
						title="关闭">
						<Close />
					</el-icon>
				</div>
			</div>
			<div class="main-wrap">
				<PlayDetail v-if="isDetail" />
				<PlayOverview
					@open-detail="isDetail = true"
					v-else />
			</div>

			<!-- 音频可视化 -->
			<div
				v-show="isDetail"
				:ref="setRef('audioVisualRef')"
				class="audio-visual-wrap">
				<canvas
					:ref="setRef('canvasRef')"
					id="audio-visual-canvas"></canvas>
			</div>

			<!-- 页脚功能区域 -->
			<div class="footer-wrap">
				<PlayFooter
					@change-progress="changeProgress"
					@on-actions="onActions"
					:play-config="footerConfig">
					<template #coverMask>
						<span
							@click="isDetail = !isDetail"
							:class="['iconfont', isDetail ? 'icon-down' : 'icon-up']"></span>
					</template>
				</PlayFooter>
			</div>

			<Transition name="left-in-right-out">
				<div
					@click.stop="1"
					class="pop-up-wrap"
					v-if="popUpWrap">
					<template v-if="popUpComponentName === EPlayFooterAction.PLAYER_STYLE">
						<PlayerStyle></PlayerStyle>
					</template>
					<template v-else-if="popUpComponentName === EPlayFooterAction.PLAY_SONG_LIST">
						<PlaySongList></PlaySongList>
					</template>
				</div>
			</Transition>
		</div>
	</div>
</template>

<style scoped lang="less">
.player-mask {
	position: fixed;
	inset: 0;
	z-index: 9000;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: var(--lyric-bg-color);
	overflow: auto;
	.player-wrapper {
		width: 70vw;
		min-width: 1024px;
		height: 700px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		border-radius: 8px;
		background-color: var(--aside-bg-color);
		position: relative;
		padding: 0 20px;
		@media (max-width: @size-xs) {
			width: 100vw;
			min-width: 0;
			height: 100%;
			border-radius: 0;
			padding: 0 10px;
		}
		.header-wrap {
			flex-shrink: 0;
			height: 50px;
			margin-bottom: 20px;
			position: relative;
			display: flex;
			align-items: center;
			@media (max-width: @size-xs) {
				margin-bottom: 10px;
			}
			.title {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				color: var(--el-text-color-primary);
				font-size: 25px;
				font-weight: bold;
				@media (max-width: @size-xs) {
					font-size: 22px;
					transform: translate(-50%, -50%);
				}
			}
			.right {
				margin-left: auto;
			}
		}
		.main-wrap {
			width: 100%;
			flex: 1;
			overflow: hidden;
		}
		.audio-visual-wrap {
			position: absolute;
			left: 0;
			bottom: 80px;
			width: 100%;
			height: 80px;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			overflow: hidden;
			@media (max-width: @size-xs) {
				display: none;
			}
		}
		.footer-wrap {
			flex-shrink: 0;
			height: 80px;
			border-top: 1px solid var(--border-color);
			padding: 10px 0;
		}
		.pop-up-wrap {
			position: absolute;
			right: 0;
			top: 0;
			width: 480px;
			height: calc(100% - 80px);
			background-color: var(--el-color-primary-light-8);
			z-index: 200;
			border-radius: 8px;
			overflow: hidden auto;
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
			}
		}
	}
}
</style>
