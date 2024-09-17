<script setup lang="ts">
import { ref } from 'vue'
import type { FriendChainItem } from '@/apis/modules/friend-chain/type'
import { friendChainApi } from '@/apis'

const friendChainList = ref<FriendChainItem[]>([])

const reqGetFriendChainList = async () => {
	const resp = await friendChainApi.reqGetFriendChainList()
	friendChainList.value = resp.data
}

reqGetFriendChainList()
</script>

<template>
	<div class="friend-chain-container">
		<div
			class="fitend-chain-wrap"
			v-for="item in friendChainList"
			:key="item.id">
			<div class="title">
				<el-divider>{{ item.categoryName }} </el-divider>
			</div>
			<div class="content">
				<div
					class="link-item-wrap"
					v-for="link in item.linkList"
					:key="link.id">
					<div class="link-item">
						<a
							:href="link.linkUrl"
							target="_blank">
							<div class="preview">
								<img :src="link.linkPreview" />
							</div>
							<div class="info">
								<div class="name">{{ link.linkName }}</div>
								<div
									class="desc"
									:title="link.linkDesc">
									{{ link.linkDesc }}
								</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.friend-chain-container {
	margin: 0 auto;
	max-width: var(--center-width);
	height: 100%;
	padding: 20px 0;
	@media (max-width: @size-xss) {
		padding: 10px 0;
	}
	.fitend-chain-wrap {
		width: 100%;
		margin-top: 30px;
		&:nth-child(1) {
			margin-top: 0;
		}
		.title {
			:deep(.el-divider__text) {
				font-size: 20px;
				font-weight: bold;
				color: var(--primary-color);
			}
		}
		.content {
			display: flex;
			flex-wrap: wrap;
			.link-item-wrap {
				padding: 8px;
				width: calc(100% / 4);
				height: 90px;
				@media (max-width: @size-md) {
					width: calc(100% / 3);
				}
				@media (max-width: @size-sm) {
					width: calc(100% / 2);
				}
				@media (max-width: @size-xss) {
					width: calc(100% / 1);
				}
				.link-item {
					width: 100%;
					height: 100%;
					margin-right: 10px;
					margin-bottom: 10px;
					border: 1px solid var(--border-color);
					border-radius: 6px;
					overflow: hidden;
					transition: border-color 0.3s;
					padding: 10px;
					&:hover {
						border-color: var(--primary-color);
					}
					a {
						display: flex;
						align-items: center;
						gap: 10px;
						cursor: pointer;
						width: 100%;
						height: 100%;
						text-decoration: none;
						overflow: hidden;
						.preview {
							width: 50px;
							height: 50px;
							border-radius: 50%;
							overflow: hidden;
							flex-shrink: 0;
							img {
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
						}
						.info {
							height: 100%;
							flex: 1;
							overflow: hidden;
							display: flex;
							flex-direction: column;
							justify-content: flex-end;
							.name {
								font-size: 18px;
								color: var(--el-text-color-primary);
								font-weight: bold;
							}
							.desc {
								font-size: 16px;
								color: var(--el-text-color-secondary);
								.one-omit();
							}
						}
					}
				}
			}
		}
	}
}
</style>
