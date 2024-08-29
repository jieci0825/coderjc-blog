<script setup lang="ts">
import TextErasure from '@/components/text-erasure'
import { useGlobalGetters } from '@/store'

const actionList = [
	{ name: '快速开始', url: '/blog', isPlain: false },
	{ name: '留下足迹', url: '/about', isPlain: true }
]

const { getSiteHomeInfo } = useGlobalGetters()
</script>

<template>
	<div class="home-hero">
		<div class="container">
			<div class="image-wrap">
				<JcLogo />
			</div>
			<div class="main">
				<TextErasure
					v-if="getSiteHomeInfo"
					:text="getSiteHomeInfo.title"
					class="name"></TextErasure>
				<TextErasure
					v-if="getSiteHomeInfo"
					:text="getSiteHomeInfo.slogan"
					class="text"></TextErasure>

				<div class="actions">
					<el-button
						@click="$router.push(item.url)"
						v-for="item in actionList"
						:key="item.name"
						type="primary"
						size="large"
						:plain="item.isPlain"
						round>
						{{ item.name }}
					</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.home-hero {
	padding: var(--home-padding);
	padding-bottom: 50px;
	@media (max-width: @size-xs) {
		padding: var(--home-sm-padding);
	}
	.container {
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		max-width: var(--home-max-width);
		padding: 0 8px;
		@media (max-width: @size-sm) {
			padding: 0;
		}
		.main {
			margin-top: 30px;
			text-align: center;
			letter-spacing: -0.4px;
			.name {
				font-size: 50px;
				color: var(--primary-color);
				font-weight: 600;
			}
			.text {
				font-size: 42px;
				color: var(--el-color-primary-light-3);
				margin-top: 10px;
			}
			.actions {
				margin-top: 30px;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				a {
					text-decoration: none;
				}
			}
		}
		.image-wrap {
			width: 240px;
			height: 240px;
			overflow: hidden;
			svg {
				width: 100%;
				height: 100%;
				fill: var(--primary-color);
			}
		}
		@media (max-width: @size-md) {
			position: relative;
			flex-direction: column;
		}
		@media (max-width: @size-xs) {
			.image-wrap {
				margin-top: 50px;
			}
			.main {
				.name {
					font-size: 28px;
				}
				.text {
					font-size: 22px;
				}
				.tagline {
					font-size: 16px;
				}
				.actions {
					margin-top: 20px;
				}
			}
			.image-wrap {
				width: 160px;
				height: 160px;
			}
		}
	}
}
</style>
