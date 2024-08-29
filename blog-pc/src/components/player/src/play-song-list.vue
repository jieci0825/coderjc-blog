<script setup lang="ts">
import { useMusicActions, useMusicGetters } from '@/store'

const { getCurPlaySongList, getCurPlaySong } = useMusicGetters()
const { setCurPlaySong } = useMusicActions()
</script>

<template>
	<div class="play-song-list-wrapper">
		<div class="header">
			<div class="header-left">播放队列</div>
			<div class="header-right">共{{ getCurPlaySongList.length }}首歌曲</div>
		</div>
		<div class="main">
			<div
				@click="setCurPlaySong(item)"
				v-for="item in getCurPlaySongList"
				:key="item.id"
				:class="{
					'active-song': item.id === getCurPlaySong?.id
				}"
				class="song-item"
				title="点击播放歌曲">
				<div class="cover">
					<img :src="item.songCover" />
				</div>
				<div class="info">
					<div class="song-name">{{ item.songName }}</div>
					<div class="song-singer">{{ item.singer }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.play-song-list-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	padding: 10px 0;
	user-select: none;
	.header {
		padding: 0 20px;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 10px;
		.header-left {
			font-size: 20px;
			color: var(--el-text-color-primary);
		}
		.header-right {
			font-size: 16px;
			color: var(--el-text-color-regular);
		}
	}
	.main {
		overflow: hidden auto;
		flex: 1;
		width: 100%;
		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
		.song-item {
			padding: 10px 20px;
			display: flex;
			align-items: center;
			overflow: hidden;
			cursor: default;
			&:hover {
				background-color: var(--el-color-primary-light-7);
			}
			&.active-song {
				background-color: var(--el-color-primary-light-5);
			}
			.cover {
				width: 50px;
				height: 50px;
				border-radius: 4px;
				overflow: hidden;
				flex-shrink: 0;
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.info {
				margin-left: 10px;
				display: flex;
				flex-direction: column;
				gap: 6px;
				font-size: 16px;
				color: var(--el-text-color-regular);
				overflow: hidden;
				.song-name {
					font-weight: 500;
					font-size: 18px;
					color: var(--el-text-color-primary);
					.one-omit();
				}
				.song-singer {
					.one-omit();
				}
			}
		}
	}
}
</style>
