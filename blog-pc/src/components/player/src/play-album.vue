<script setup lang="ts">
import { useMusicGetters } from '@/store'

const { getAlbumMode, getCurPlaySong, getIsPlay } = useMusicGetters()
</script>

<template>
	<div class="album-wrap">
		<div :class="['album-box', getAlbumMode]">
			<template v-if="getAlbumMode === 'album'">
				<div
					:class="{ play: getIsPlay }"
					class="album-inner">
					<div class="album">
						<!-- 唱片边框 -->
						<div class="album-border">
							<!-- 唱片纹路 -->
							<div class="lines"></div>
							<!-- 唱片图 -->
							<div class="album-image">
								<img
									v-if="getCurPlaySong?.songCover"
									:src="getCurPlaySong?.songCover" />
								<div
									v-else
									class="placeholder-image">
									<span class="iconfont icon-listen-music"></span>
								</div>
							</div>
							<!-- 光束 -->
							<div class="ray"></div>
						</div>
					</div>
					<!-- 唱针 -->
					<div class="arm-wrap">
						<div class="circle"></div>
						<div class="arm"></div>
					</div>
				</div>
			</template>
			<template v-else-if="getAlbumMode === 'square'">
				<div class="cover-inner">
					<div class="cover-image">
						<img
							v-if="getCurPlaySong?.songCover"
							:src="getCurPlaySong?.songCover" />
						<div
							v-else
							class="placeholder-image">
							<span class="iconfont icon-listen-music"></span>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped lang="less">
.album-wrap {
	flex: 1;
	flex-shrink: 0;
	@media (max-width: @size-xs) {
		display: none;
	}
	.album-box {
		margin-left: auto;
		width: 80%;
		max-width: 400px;
		max-height: 400px;

		.album-inner {
			width: 100%;
			height: 0;
			padding-bottom: 100%;
			position: relative;
			border-radius: 10%;
			box-shadow: var(--album-shadow-1);
			background-color: var(--album-bg-color);
			&.play {
				.album {
					.album-border {
						animation-play-state: running;
						.ray {
							animation-play-state: running;
						}
					}
				}
				.arm-wrap {
					transform: rotate(14deg);
					.arm {
						animation-play-state: running;
					}
				}
			}
			.album {
				position: absolute;
				inset: 0;
				width: 100%;
				height: 100%;
				padding: 9%;
				overflow: hidden;
				.album-border {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					border: 15px solid var(--album-border-color);
					position: relative;
					box-shadow: var(--album-shadow-2);
					animation: rotate 8s linear infinite;
					animation-fill-mode: forwards;
					animation-play-state: paused;
					overflow: hidden;
					.lines {
						border-radius: 50%;
						width: 100%;
						height: 100%;
						background: var(--album-line-bg);
					}
					.album-image {
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						width: 70%;
						height: 70%;
						border-radius: 50%;
						border: 1px solid var(--album-image-border-color);
						overflow: hidden;
						z-index: 1;

						img {
							width: 100%;
							height: 100%;
							object-fit: cover;
						}
					}
					.ray {
						position: absolute;
						inset: 0;
						background: var(--album-ray-bg);
						z-index: 2;
						animation: reverse 8s linear infinite;
						animation-fill-mode: forwards;
						animation-play-state: paused;
					}
				}
			}
			.arm-wrap {
				position: absolute;
				right: 5%;
				top: 5%;
				width: 12%;
				height: 12%;
				transition: transform 0.5s linear;
				.circle {
					position: absolute;
					inset: 0;
					border-radius: 50%;
					background: var(--album-circle-bg);
					box-shadow: var(--album-shadow-5);
					z-index: 2;
				}
				.arm {
					z-index: 1;
					position: absolute;
					left: -120%;
					top: 50%;
					width: 180%;
					height: 400%;
					border: 0.6vw solid var(--album-arm-color);
					border-left-color: transparent;
					border-top-color: transparent;
					border-bottom-right-radius: 3vw;
					transform: rotate(-42deg) skew(-40deg);
					transform-origin: right top;
					animation: run 4s linear infinite;
					animation-play-state: paused;
					filter: var(--album-shadow-4);
					&::before {
						content: '';
						position: absolute;
						left: -30%;
						bottom: calc(-6% - 0.3vw);
						width: 50%;
						height: 12%;
						background-color: var(--album-arm-color-1);
						transform: skew(40deg);
						border-radius: 0.7vw;
					}
				}
			}
		}
		&.square {
			.cover-inner {
				width: 100%;
				height: 0;
				padding-bottom: 100%;
				position: relative;
				border-radius: 2%;
				overflow: hidden;
				.cover-image {
					position: absolute;
					inset: 0;
					img {
						width: 100%;
						height: 100%;
						object-fit: cover;
					}
					.placeholder-image {
						.iconfont {
							font-size: 120px;
						}
					}
				}
			}
		}
		.placeholder-image {
			width: 100%;
			height: 100%;
			background-color: var(--album-bg-color);
			display: flex;
			justify-content: center;
			align-items: center;
			.iconfont {
				font-size: 80px;
				color: var(--el-color-primary-light-5);
			}
		}
	}
}

@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
@keyframes reverse {
	from {
		transform: rotate(360deg);
	}
	to {
		transform: rotate(0deg);
	}
}

@keyframes run {
	0% {
		transform: rotate(-42deg) skew(-40deg);
	}
	50% {
		transform: rotate(-40deg) skew(-40deg);
	}
	100% {
		transform: rotate(-42deg) skew(-40deg);
	}
}
</style>
