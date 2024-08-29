<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Plum from './components/plum'
import Player from './components/player'
import PlayLyric from '@/components/player/src/play-lyric.vue'
import { useInit } from './hooks'
import { ElConfigProvider } from 'element-plus'
import { useGlobalActions, useGlobalGetters, useMusicGetters } from '@/store'
import { globalApi } from './apis'

useInit()

const { getRouteAnimation } = useGlobalGetters()
const { reqGetSiteHomeInfo } = useGlobalActions()
const { getLyricVisible, getPlayerVisible, getCurPlaySong, getVolume, getIsMute } = useMusicGetters()
reqGetSiteHomeInfo()

globalApi.reqVisitSite()
</script>

<template>
	<el-config-provider :locale="zhCn">
		<router-view v-slot="{ Component }">
			<Transition
				:name="getRouteAnimation"
				mode="out-in">
				<Component :is="Component" />
			</Transition>
		</router-view>
	</el-config-provider>

	<Plum />

	<Player v-show="getPlayerVisible" />

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
