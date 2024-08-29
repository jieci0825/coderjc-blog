<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useMusicActions, useMusicGetters } from '@/store'

const {
	getLyricDirection,
	getCurPlaySong,
	getCurPlaySongLyricList,
	getLyricRows,
	getLyricFontSize,
	getCurLyricActiveIndex,
	getIsPlay
} = useMusicGetters()
const { switchSong, setLyricRows, setIsPlay, setPlayerVisible, setLyricDirection, setLyricVisible } = useMusicActions()

const size = ref(50)
const wrapSize = computed(() => {
	return size.value * getLyricRows.value
})

const curPage = computed(() => {
	return Math.floor(getCurLyricActiveIndex.value / getLyricRows.value)
})
const top = computed(() => {
	return curPage.value * wrapSize.value
})

const isHorizontal = computed(() => {
	return getLyricDirection.value === 'horizontal' ? true : false
})

function highlightEnglishWords(str: string) {
	return str.replace(/(\b[a-zA-Z]+\b|\d+)/g, function (match) {
		// 对每个匹配的单词，进一步处理每个字母，用 `<span>` 包裹
		const wrappedLetters = match
			.split('')
			.map(letter => `<span class="letter-item">${letter}</span>`)
			.join('')
		return `<div class="letter">${wrappedLetters}</div>`
	})
}

const formatLyric = (str: string) => {
	if (str === '') return ''
	const result = isHorizontal.value ? str : highlightEnglishWords(str)
	return result
}

const isRefresh = ref(true)
watch(
	() => isHorizontal.value,
	() => {
		refresh()
	}
)

function refresh() {
	isRefresh.value = false
	nextTick(() => {
		isRefresh.value = true
	})
}

const setOddEven = () => {
	setLyricRows(getLyricRows.value === 1 ? 2 : 1)
	refresh()
}
</script>

<template>
	<Teleport to="body">
		<div
			v-if="isRefresh"
			v-drag
			:style="{ '--size': `${wrapSize}px` }"
			:class="['play-lryic-wrapper', getLyricDirection]">
			<div class="controller">
				<div
					@click="setPlayerVisible(true)"
					title="打开主界面"
					class="prev controller-item">
					<span class="iconfont icon-logo f-s-20"></span>
				</div>
				<div
					@click="setLyricDirection(isHorizontal ? 'vertical' : 'horizontal')"
					:title="isHorizontal ? '竖屏' : '横屏'"
					class="prev controller-item">
					<span
						:class="[isHorizontal ? 'icon-horizontal-to-vertical' : 'icon-vertical-to-horizontal']"
						class="iconfont"></span>
				</div>
				<div
					@click="switchSong('prev')"
					title="上一首"
					class="prev controller-item">
					<span class="iconfont icon-prev"></span>
				</div>
				<div
					@click="() => setIsPlay()"
					:title="getIsPlay ? '暂停' : '播放'"
					class="switch controller-item">
					<span :class="['iconfont', getIsPlay ? 'icon-pause' : 'icon-play']"></span>
				</div>
				<div
					@click="switchSong('next')"
					title="下一首"
					class="next controller-item">
					<span class="iconfont icon-next"></span>
				</div>
				<div
					@click="setOddEven()"
					title="单行/双行"
					class="next controller-item">
					<span class="iconfont icon-odd-even"></span>
				</div>
				<div
					@click="setLyricVisible(false)"
					title="关闭"
					class="next controller-item">
					<span class="iconfont icon-close"></span>
				</div>
			</div>
			<div :class="['lyric', `row-${getLyricRows}`]">
				<div
					v-if="getCurPlaySong"
					:style="{ '--offset': `-${top}px` }"
					class="lyric-list">
					<template
						v-for="(item, index) in getCurPlaySongLyricList"
						:key="index">
						<div
							:style="{ '--size': `${size}px`, 'font-size': `${getLyricFontSize}px` }"
							:class="{ active: index === getCurLyricActiveIndex }"
							v-html="formatLyric(item.lrc)"
							class="lyric-item"></div>
					</template>
				</div>
				<div
					v-else
					class="empty-music-tip">
					<span :style="{ 'font-size': `${getLyricFontSize}px` }">暂无歌曲</span>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<style scoped lang="less">
.play-lryic-wrapper {
	user-select: none;
	position: fixed;
	z-index: 9100;
	border-radius: 4px;
	background-color: transparent;
	display: flex;
	cursor: move;
	.controller {
		opacity: 0;
		.controller-item {
			cursor: pointer;
		}
	}
	&:hover {
		background-color: var(--lyric-bg-color);
		.controller {
			opacity: 1;
		}
	}
	&.horizontal {
		flex-direction: column;
		padding: 5px 10px;
		left: 50%;
		bottom: 2%;
		transform: translateX(-50%);
		max-width: 80vw;
		min-width: 500px;
		height: calc(40px + var(--size));
		.lyric {
			width: 100%;
			flex: 1;
			overflow: hidden;
			height: var(--size);
			&.row-1 {
				.lyric-list {
					.lyric-item.lyric-item {
						justify-content: center;
					}
				}
			}
			.lyric-list {
				width: 100%;
				transform: translateY(var(--offset));
				.lyric-item {
					width: 100%;
					overflow: hidden;
					height: var(--size);
					line-height: var(--size);
					color: var(--el-color-primary-light-5);
					font-weight: 600;
					word-spacing: -4px;
					display: flex;
					align-items: center;
					&.active {
						color: var(--el-color-primary);
					}
				}
				.lyric-item:nth-child(odd) {
					justify-content: flex-start;
				}
				.lyric-item:nth-child(even) {
					justify-content: flex-end;
				}
			}
		}
		.controller {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			height: 22px;
			margin-bottom: 8px;
			gap: 10px;
			.controller-item {
				color: var(--lyric-controller-text-color-1);
				.iconfont {
					font-size: 22px;
					&.f-s-20 {
						font-size: 20px;
					}
				}
				&:hover {
					color: var(--lyric-controller-text-color-2);
				}
			}
		}
		.empty-music-tip {
			color: var(--el-color-primary);
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-weight: 600;
		}
	}
	&.vertical {
		padding: 10px 5px;
		top: 50%;
		right: 2%;
		transform: translateY(-50%);
		width: calc(40px + var(--size));
		max-height: 80%;
		min-height: 500px;
		.lyric {
			width: var(--size);
			max-height: calc(100% - 20px);
			flex: 1;
			overflow: hidden;
			&.row-1 {
				.lyric-list {
					.lyric-item.lyric-item {
						justify-content: center;
					}
				}
			}
			.lyric-list {
				height: 100%;
				transform: translateX(var(--offset));
				display: flex;
				.lyric-item {
					writing-mode: vertical-rl;
					text-orientation: upright;
					flex-shrink: 0;
					width: 100%;
					overflow: hidden;
					width: var(--size);
					text-align: right;
					color: var(--el-color-primary-light-5);
					font-weight: 600;
					word-spacing: -4px;
					display: flex;
					align-items: center;
					&.active {
						color: var(--el-color-primary);
					}
					:deep(.letter) {
						margin: 5px 0;
						margin-left: 3%;
						display: flex;
						letter-spacing: -1rem;
						.letter-item {
							transform: rotate(90deg);
						}
					}
				}
				.lyric-item:nth-child(odd) {
					justify-content: flex-start;
				}
				.lyric-item:nth-child(even) {
					justify-content: flex-end;
				}
			}
		}
		.controller {
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 22px;
			margin-right: 8px;
			gap: 10px;
			.controller-item {
				color: var(--lyric-controller-text-color-1);
				writing-mode: vertical-rl;
				text-orientation: upright;
				.iconfont {
					font-size: 22px;
				}
				&:hover {
					color: var(--lyric-controller-text-color-2);
				}
			}
		}
		.empty-music-tip {
			width: 100%;
			height: 100%;
			writing-mode: vertical-rl;
			text-orientation: upright;
			color: var(--el-color-primary);
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 600;
		}
	}
}
</style>
