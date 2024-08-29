<script setup lang="ts">
import ProgressBar from '@/components/progress-bar'
import { computed } from 'vue'
import { useMusicActions, useMusicGetters } from '@/store'
import { EPlayMode, EPlayFooterAction, type PlayFooterActionType } from './player'

type PlayFooterConfig = 'play' | 'prev' | 'next' | 'volume' | 'play-mode' | 'player-style' | 'song-list' | 'lyric'

interface PlayFooterProps {
	playConfig?: PlayFooterConfig[]
}

interface PlayFooterEmits {
	(e: 'changeProgress', progress: number): void
	(e: 'onActions', action: PlayFooterActionType): void
}

const props = withDefaults(defineProps<PlayFooterProps>(), {
	playConfig: () => {
		return ['play-mode', 'next', 'play', 'prev', 'volume', 'player-style', 'song-list']
	}
})
const emits = defineEmits<PlayFooterEmits>()

const {
	getLyricVisible,
	getVolume,
	getIsMute,
	getCurPlaySong,
	getIsPlay,
	getPlayMode,
	getCurPlaySongSec,
	getCurPlaySongTotalSec
} = useMusicGetters()
const { setVolume, setMute, setIsPlay, setPlayMode, switchSong, setLyricVisible } = useMusicActions()

const isShowConfig = (config: PlayFooterConfig) => {
	return props.playConfig.includes(config)
}

const playModeMap: any = {
	[EPlayMode.LIST_LOOP]: {
		icon: 'icon-list-loop',
		text: '列表循环'
	},
	[EPlayMode.SINGLE]: {
		icon: 'icon-single',
		text: '单曲循环'
	},
	[EPlayMode.RANDOM]: {
		icon: 'icon-random',
		text: '随机播放'
	}
}

const playList: EPlayMode[] = [EPlayMode.LIST_LOOP, EPlayMode.SINGLE, EPlayMode.RANDOM]

const changePlayMode = (mode: EPlayMode) => {
	setPlayMode(mode)
}

const progress = computed(() => {
	return Math.floor((getCurPlaySongSec.value / getCurPlaySongTotalSec.value) * 100)
})

// 将秒数转为时:秒
const formatTime = (sec: number) => {
	const min = Math.floor(sec / 60)
	const sec2 = Math.ceil(sec % 60)
	return `${min < 10 ? '0' + min : min}:${sec2 < 10 ? '0' + sec2 : sec2}`
}

const changeProgress = (progress: number) => {
	emits('changeProgress', progress)
}
</script>

<template>
	<div class="footer-box">
		<div class="info">
			<div class="cover">
				<img :src="getCurPlaySong?.songCover" />
			</div>
			<div class="text">
				<div class="song-name">{{ getCurPlaySong?.songName }}</div>
				<div class="singer">{{ getCurPlaySong?.singer }}</div>
			</div>
		</div>
		<div class="controller">
			<div class="btns">
				<!-- 播放模式 -->
				<div
					v-if="isShowConfig('play-mode')"
					:title="playModeMap[getPlayMode].text"
					class="play-mode">
					<el-popover
						popper-class="play-mode-popover"
						placement="top"
						trigger="click">
						<template #reference>
							<span
								:class="[playModeMap[getPlayMode].icon]"
								class="iconfont"></span>
						</template>
						<div class="play-mode-menu">
							<div
								@click="changePlayMode(item)"
								v-for="(item, idx) in playList"
								:key="idx"
								:class="['menu-item', getPlayMode === item ? 'active' : '']">
								<span :class="['iconfont', playModeMap[item].icon]"> </span>
								<span class="menu-text">{{ playModeMap[item].text }}</span>
							</div>
						</div>
					</el-popover>
				</div>
				<!-- 播放、切换歌曲 -->
				<div class="cut-switch">
					<div
						@click="switchSong('prev')"
						title="上一首"
						class="prev">
						<span class="iconfont icon-prev"></span>
					</div>
					<div
						@click="() => setIsPlay()"
						:title="getIsPlay ? '暂停' : '播放'"
						class="switch">
						<span :class="['iconfont', getIsPlay ? 'icon-pause' : 'icon-play']"></span>
					</div>
					<div
						@click="switchSong('next')"
						title="下一首"
						class="next">
						<span class="iconfont icon-next"></span>
					</div>
				</div>
				<!-- 音量 -->
				<div
					class="volume"
					title="调节音量">
					<el-popover
						popper-class="play-volume-popover"
						placement="top"
						trigger="click">
						<template #reference>
							<span :class="['iconfont', getVolume === 0 || getIsMute ? 'icon-mute' : 'icon-volume']"></span>
						</template>
						<div class="volume-progress-wrap">
							<ProgressBar
								@change-progress="setVolume"
								:progress="getVolume"
								:mode="'vertical'"
								style="height: 130px" />
							<div class="volume-text">{{ getVolume }}%</div>
							<div class="divide"></div>
							<div class="switch-mute">
								<span
									@click.stop="setMute(!getIsMute)"
									:class="['iconfont', getVolume === 0 || getIsMute ? 'icon-mute' : 'icon-volume']"></span>
							</div>
						</div>
					</el-popover>
				</div>
			</div>
			<div class="progress-wrap">
				<div class="time front">{{ formatTime(getCurPlaySongSec) }}</div>
				<ProgressBar
					@change-progress="changeProgress"
					:progress="progress" />
				<div class="time back">{{ formatTime(getCurPlaySongTotalSec) }}</div>
			</div>
		</div>
		<div class="actions">
			<!-- 播放器样式 -->
			<div
				@click.stop="emits('onActions', EPlayFooterAction.PLAYER_STYLE)"
				class="action-item">
				<span class="iconfont icon-player"></span>
			</div>
			<!-- 歌曲列表 -->
			<div
				@click.stop="emits('onActions', EPlayFooterAction.PLAY_SONG_LIST)"
				class="action-item">
				<span class="iconfont icon-play-list"></span>
			</div>
			<!-- 歌词 -->
			<div
				:class="{ active: getLyricVisible }"
				@click="setLyricVisible()"
				class="action-item">
				<span class="iconfont icon-lyric"></span>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.footer-box {
	width: 100%;
	display: flex;
	align-items: center;
	user-select: none;
	.iconfont {
		font-size: 24px;
		&:hover {
			color: var(--el-color-primary);
		}
	}
	.info {
		flex: 1;
		margin-right: auto;
		font-size: 16px;
		display: flex;
		align-items: center;
		.text {
			max-width: 180px;
			.song-name,
			.singer {
				.one-omit();
				color: var(--el-text-color-primary);
			}
		}
		.cover {
			margin-right: 10px;
			width: 55px;
			height: 55px;
			border-radius: var(--base-b-r);
			overflow: hidden;
			flex-shrink: 0;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
	.controller {
		flex: 1.3;
		flex-shrink: 0;
		min-width: 380px;
		margin: 0 50px;
		color: var(--el-text-color-primary);
		.btns {
			display: flex;
			align-items: center;
			justify-content: center;
			.play-mode {
				flex-shrink: 0;
			}
			.cut-switch {
				display: flex;
				align-items: center;
				margin: 0 40px;
				gap: 20px;
				.switch {
					padding: 2px 8px;
					border-radius: 20px;
					background-color: var(--el-color-primary-light-8);
				}
			}
			.volume {
				flex-shrink: 0;
			}
		}
		.progress-wrap {
			width: 100%;
			margin-top: 10px;
			display: flex;
			align-items: center;
			.time {
				color: var(--el-text-color-secondary);
			}
		}
	}
	.actions {
		flex: 1;
		flex-shrink: 0;
		margin-left: auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 20px;
		.action-item {
			&.active {
				.iconfont {
					color: var(--el-color-primary);
				}
			}
		}
	}
}
.play-mode-menu {
	width: 100%;
	padding: 5px;
	.menu-item {
		padding: 8px 0;
		text-align: center;
		border-top: 1px solid var(--border-color);
		cursor: pointer;
		&.active {
			color: var(--el-color-primary);
		}
		&:nth-child(1) {
			border-top-color: transparent;
		}
		&:hover {
			background-color: var(--bg-color-1);
		}
		.iconfont {
			margin-right: 5px;
		}
	}
}

.volume-progress-wrap {
	width: 100%;
	padding: 0 10px 5px 10px;
	display: flex;
	align-items: center;
	flex-direction: column;
	.volume-text {
		user-select: none;
		margin-top: 12px;
		color: var(--el-text-color-primary);
		cursor: default;
	}
	.divide {
		width: 100%;
		height: 1px;
		background-color: var(--border-color);
		margin: 5px 0;
	}
	.switch-mute {
		text-align: center;
		.iconfont {
			font-size: 22px;
			cursor: pointer;
			&:hover {
				color: var(--el-color-primary);
			}
		}
	}
}
</style>
