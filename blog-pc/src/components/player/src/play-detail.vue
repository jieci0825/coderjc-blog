<script setup lang="ts">
import PlayAlbum from './play-album.vue'
import PlaySongContent from './play-song-content.vue'
</script>

<template>
	<div class="play-detail">
		<!-- 唱片 -->
		<PlayAlbum />
		<!-- 分割 -->
		<div class="divide"></div>
		<!-- 歌曲 -->
		<PlaySongContent />
	</div>
</template>

<style scoped lang="less">
.play-detail {
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-top: 20px;
	padding-bottom: 100px;
	overflow: auto hidden;
	@media (max-width: @size-xs) {
		padding-top: 0;
		padding-bottom: 30px;
	}
	.divide {
		width: 10%;
		max-width: 180px;
		@media (max-width: @size-xs) {
			display: none;
		}
	}
}
</style>
