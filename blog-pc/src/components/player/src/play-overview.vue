<script setup lang="ts">
import { useMusicActions, useMusicGetters } from '@/store'
import type { MusicItem } from '@/apis/modules/music/type'

const { getMusicCategory, getCurPlaySongList, getCurPlaySong, getCurMusicCategoryId } = useMusicGetters()
const { reqGetMusicListByCategoryId, setCurPlaySong } = useMusicActions()

interface PlayOverviewEmits {
	(e: 'openDetail'): void
}

const emits = defineEmits<PlayOverviewEmits>()

const getSongList = (id: number) => {
	reqGetMusicListByCategoryId(id)
}

const playSong = (item: MusicItem) => {
	setCurPlaySong(item)
	emits('openDetail')
}
</script>

<template>
	<div class="play-overview-wrapper">
		<div class="music-category">
			<div class="category-list">
				<div
					v-for="item in getMusicCategory"
					:key="item.id"
					class="category-item-wrap">
					<div
						@click="getSongList(item.id)"
						:class="{ active: item.id === getCurMusicCategoryId }"
						class="category-item">
						<span :class="['iconfont', item.categoryIcon]"></span>
						<span class="category-name">{{ item.categoryName }}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="song-list">
			<div class="song-list-header">
				<span class="text">歌曲列表</span>
				<span class="count">共{{ getCurPlaySongList.length || 0 }}首</span>
			</div>
			<template v-if="getCurPlaySongList.length">
				<div
					@click="playSong(item)"
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
			</template>
			<template v-else>
				<div class="no-song">该分类下暂无歌曲</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="less">
.play-overview-wrapper {
	width: 100%;
	height: 100%;
	display: flex;
	overflow: auto;
	@media (max-width: @size-xs) {
		flex-direction: column;
	}
	.music-category {
		flex: 1.5;
		@media (max-width: @size-xs) {
			flex: 0;
			margin-bottom: 10px;
		}
		.category-list {
			display: flex;
			flex-wrap: wrap;
			align-items: flex-start;
			.category-item-wrap {
				flex-shrink: 0;
				width: 20%;
				height: 0;
				padding-bottom: 20%;
				position: relative;
				.category-item {
					position: absolute;
					inset: 0;
					z-index: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					color: var(--el-text-color-primary);
					cursor: pointer;
					user-select: none;
					transition: color 0.3s;
					&.active {
						color: var(--el-color-primary);
					}
					&:hover {
						color: var(--el-color-primary);
					}
					.iconfont {
						font-size: 50px;
						@media (max-width: @size-xs) {
							font-size: 30px;
						}
					}
					.category-name {
						margin-top: 10px;
						font-size: 18px;
						font-weight: 600;
						@media (max-width: @size-xs) {
							font-size: 16px;
						}
					}
				}
			}
		}
	}
	.song-list {
		flex: 1;
		height: 100%;
		overflow: hidden auto;
		width: 100%;
		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}
		.song-list-header {
			width: 100%;
			.text {
				font-size: 20px;
				font-weight: 600;
				color: var(--el-text-color-primary);
			}
			.count {
				margin-left: 10px;
				font-size: 16px;
				color: var(--el-text-color-regular);
			}
		}
		.song-item {
			padding: 10px 20px;
			display: flex;
			align-items: center;
			overflow: hidden;
			cursor: default;
			transition: background-color 0.3s;
			border-radius: 4px;
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
		.no-song {
			text-align: center;
			margin: 30px auto;
			font-size: 24px;
			color: var(--el-color-primary);
			font-weight: 600;
		}
	}
}
</style>
