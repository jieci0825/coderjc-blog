<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/hooks'
import { useMusicActions, useMusicGetters } from '@/store'
import { EMusicPlayerStyle, type AlbumModeType, type MusicEffectType } from './player'

const { isDark, switchTheme } = useTheme()

const { getAlbumMode, getMusicEffect } = useMusicGetters()
const { setAlbumMode, setMusicEffect } = useMusicActions()

function _setAlbumMode(mode: AlbumModeType, theme: 'dark' | 'light') {
	switchTheme(theme)
	setAlbumMode(mode)
}

const albumOptions = [
	{
		label: '方形封面-深',
		type: 'square-dark',
		handle: () => {
			_setAlbumMode('square', 'dark')
		},
		src: 'https://cos.coderjc.cn/coderjc-blog/20240823015412916-yrflei.jpeg'
	},
	{
		label: '方形封面-浅',
		type: 'square-light',
		handle: () => {
			_setAlbumMode('square', 'light')
		},
		src: 'https://cos.coderjc.cn/coderjc-blog/20240823015312061-p8tvii.jpeg'
	},
	{
		label: '黑胶唱片-浅',
		type: 'album-light',
		handle: () => {
			_setAlbumMode('album', 'light')
		},
		src: 'https://cos.coderjc.cn/coderjc-blog/20240823015412855-49nqj8.jpeg'
	},
	{
		label: '黑胶唱片-深',
		type: 'album-dark',
		handle: () => {
			_setAlbumMode('album', 'dark')
		},
		src: 'https://cos.coderjc.cn/coderjc-blog/20240823015412796-28sx6p.jpeg'
	}
]

const curAlbumActive = computed(() => {
	return `${getAlbumMode.value}-${isDark.value ? 'dark' : 'light'}`
})

interface MusicEffect {
	label: string
	name: MusicEffectType
	src: string
}

const musicEffects: MusicEffect[] = [
	{ label: '关闭', name: EMusicPlayerStyle.NONE, src: '' },
	{
		label: '朴素',
		name: EMusicPlayerStyle.PLAIN_BAR,
		src: 'https://cos.coderjc.cn/coderjc-blog/20240823153304334-8fbaiq.jpeg'
	},
	{
		label: '热烈',
		name: EMusicPlayerStyle.FERVENT_BAR,
		src: 'https://cos.coderjc.cn/coderjc-blog/20240823153304338-4u3bwf.jpeg'
	}
]
</script>

<template>
	<div class="player-style-wrapper">
		<!-- 唱片风格 -->
		<div class="option-title">唱片风格</div>
		<div class="option-wrap">
			<div
				v-for="(item, idx) in albumOptions"
				:key="idx"
				:class="{ active: item.type === curAlbumActive }"
				class="option-item">
				<div
					@click="item.handle"
					class="content-box">
					<img :src="item.src" />
					<div class="checked">
						<span class="iconfont icon-checked"></span>
					</div>
				</div>
				<div class="text">{{ item.label }}</div>
			</div>
		</div>
		<!-- 动效风格 -->
		<div class="option-title">动效风格</div>
		<div class="option-wrap">
			<div
				v-for="(item, idx) in musicEffects"
				:key="idx"
				:class="{ active: getMusicEffect === item.name }"
				class="option-item">
				<div
					@click="setMusicEffect(item.name)"
					class="content-box">
					<img
						v-if="item.src"
						:src="item.src" />
					<div class="checked">
						<span class="iconfont icon-checked"></span>
					</div>
				</div>
				<div class="text">{{ item.label }}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.player-style-wrapper {
	width: 100%;
	padding: 10px 20px;
	.option-title {
		font-size: 20px;
		font-weight: bold;
		color: var(--el-text-color-primary);
		margin-bottom: 5px;
		margin-top: 20px;
		&:nth-child(1) {
			margin-top: 0;
		}
	}
	.option-wrap {
		width: 100%;
		display: flex;
		gap: 15px;
		flex-wrap: wrap;
		.option-item {
			width: calc((100% - 15px) / 2);
			height: 150px;
			overflow: hidden;
			&.active {
				.content-box {
					.checked {
						display: block;
					}
				}
			}
			.content-box {
				position: relative;
				border-radius: 6px;
				width: 100%;
				height: 120px;
				overflow: hidden;
				border: 2px solid var(--el-color-primary);
				transition: border-color 0.3s;
				.checked {
					display: none;
					position: absolute;
					right: 6%;
					bottom: 8%;
					color: var(--el-color-primary);
					.iconfont {
						font-size: 24px;
					}
				}
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.text {
				margin-top: 5px;
				line-height: 20px;
				font-size: 16px;
				color: var(--el-text-color-primary);
			}
		}
	}
}
</style>
