<script setup lang="ts">
import { useEventListener } from '@/hooks'
import { useMusicGetters } from '@/store'
import { debounce } from '@/utils'
import { computed, ref, nextTick, watch } from 'vue'

const { getCurPlaySongLyricList, getCurLyricActiveIndex, getCurPlaySong } = useMusicGetters()

// 歌词项高度
const lyricItemHeightList = ref<number[]>([])
// 歌词容器可视高度
const lyricBoxHeight = ref(0)
// 计算出初始需要往下偏移的距离
const initTop = computed(() => {
	const oneLyricItemHeight = lyricItemHeightList.value[0] || 0
	return (lyricBoxHeight.value - oneLyricItemHeight) / 2
})
// 歌词上移量
const lyricTop = computed(() => {
	if (getCurLyricActiveIndex.value !== 0) {
		const _top = lyricItemHeightList.value.slice(0, getCurLyricActiveIndex.value).reduce((pre, cur) => pre + cur, 0)
		return -_top + initTop.value
	} else {
		return initTop.value
	}
})

const dResetLyricBoxHeight = debounce(() => {
	nextTick(() => {
		const lyricBox = document.querySelector('.lyric-box')!
		lyricBoxHeight.value = lyricBox.clientHeight
	})
}, 200)

useEventListener(window, 'resize', () => {
	dResetLyricBoxHeight()
})

watch(
	() => getCurPlaySong.value,
	() => {
		// 清空之前的歌词高度数组
		lyricItemHeightList.value.length = 0

		nextTick(() => {
			const lyricItemDomList = document.querySelectorAll('.lyric-item')!
			for (const element of lyricItemDomList) {
				lyricItemHeightList.value.push(element.clientHeight)
			}

			const lyricBox = document.querySelector('.lyric-box')!
			lyricBoxHeight.value = lyricBox.clientHeight
		})
	},
	{ immediate: true, deep: true }
)

function highlightEnglishWords(str: string) {
	if (!str) return ''
	// 使用正则表达式匹配所有的英文单词
	return str.replace(/\b[a-zA-Z]+\b/g, '<span class="letter">$&</span>')
}
</script>

<template>
	<div class="song-content-wrap">
		<div class="song-info">
			<h3>{{ getCurPlaySong?.songName }}</h3>

			<p>{{ getCurPlaySong?.singer }}</p>
		</div>
		<div class="lyric-wrap">
			<div class="lyric-box">
				<template v-if="getCurPlaySongLyricList && getCurPlaySongLyricList.length">
					<div
						:style="{ '--top': `${lyricTop}px` }"
						class="lyric-list">
						<div
							v-for="(item, idx) in getCurPlaySongLyricList"
							:key="idx"
							:class="{ active: idx === getCurLyricActiveIndex }"
							v-html="highlightEnglishWords(item.lrc)"
							class="lyric-item"></div>
					</div>
				</template>
				<template v-else>
					<div class="no-lyric">暂无歌词</div>
				</template>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.song-content-wrap {
	flex: 1;
	height: 100%;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	.song-info {
		flex-shrink: 0;
		margin-bottom: 20px;
		@media (max-width: @size-xs) {
			text-align: center;
		}
		h3 {
			color: var(--el-text-color-primary);
			font-size: 30px;
		}
		p {
			color: var(--el-text-color-regular);
			font-size: 16px;
			line-height: 1.5;
		}
	}
	.lyric-wrap {
		width: 100%;
		flex: 1;
		border: 1px solid transparent;
		position: relative;
		overflow: hidden;
		.lyric-box {
			width: 100%;
			height: 100%;
			overflow: hidden;
			&::-webkit-scrollbar {
				width: 0;
				height: 0;
			}
			.lyric-list {
				width: 100%;
				transform: translateY(var(--top));
				transition: transform 0.3s;
				.lyric-item {
					width: 100%;
					font-size: 20px;
					line-height: 1.3;
					cursor: pointer;
					transition: all 0.5s ease-in-out;
					padding: 10px 0;
					word-wrap: break-word; /* 支持旧浏览器 */
					overflow-wrap: break-word; /* 支持现代浏览器 */
					word-break: normal; /* 避免单词被强制隔断 */
					white-space: normal; /* 允许文本换行 */
					word-spacing: -4px;
					@media (max-width: @size-xs) {
						width: 80%;
						margin: 0 auto;
						text-align: center;
						&.active.active {
							transform: translateX(0) scale(1.2);
							color: var(--primary-color);
							width: 80%;
						}
					}
					&.active {
						transform: translateX(10%) scale(1.2);
						color: var(--primary-color);
						width: 80%;
					}
					:deep(.letter) {
						letter-spacing: -0.5px;
					}
				}
			}
			.no-lyric {
				font-size: 30px;
				margin-top: calc(50% - 15px);
				color: var(--el-color-primary);
				@media (max-width: @size-xs) {
					text-align: center;
				}
			}
		}
		&::before,
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			height: 30%;
			z-index: 100;
		}
		&::before {
			top: 0;
			left: 0;
			background-image: var(--lyric-gradual-1);
		}
		&::after {
			bottom: 0;
			left: 0;
			background-image: var(--lyric-gradual-2);
		}
	}
}
</style>
