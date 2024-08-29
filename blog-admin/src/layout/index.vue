<script setup lang="ts">
import PlaySong from '@/components/player'
import PlayLyric from '@/components/player/src/play-lyric.vue'
import LayoutVertical from './layout-mode/layout-vertical.vue'
import LayoutHorizontal from './layout-mode/layout-horizontal.vue'
import { useGlobalGetters, useMusicGetters } from '@/store'
import { LAYOUT_MODE } from '@/constants'
import { computed } from 'vue'

const { getLayoutMode, getRouteAnimation } = useGlobalGetters()
const { getLyricVisible, getPlayerVisible, getVolume, getIsMute, getCurPlaySong } = useMusicGetters()

const compMap = {
	[LAYOUT_MODE.VERTICAL]: LayoutVertical,
	[LAYOUT_MODE.HORIZONTAL]: LayoutHorizontal
}
const comp = computed(() => compMap[getLayoutMode.value])
</script>

<template>
	<Transition
		:name="getRouteAnimation"
		mode="out-in">
		<Component :is="comp" />
	</Transition>

	<!-- 播放器 -->
	<PlaySong v-show="getPlayerVisible"></PlaySong>

	<audio
		:src="getCurPlaySong?.songUrl"
		:volume="getVolume / 100"
		:muted="getIsMute"
		crossorigin="anonymous"
		style="display: none"
		id="player"
		controls></audio>

	<!-- 悬浮歌词 -->
	<PlayLyric v-if="getLyricVisible"></PlayLyric>
</template>

<style scoped lang="less"></style>
