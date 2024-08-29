<script setup lang="ts">
import BlogSidebarItemSkeleton from './blog-sidebar-item-skeleton.vue'
import { inject, ref } from 'vue'
import { useSkeleton } from '@/hooks'
import { useGlobalGetters } from '@/store'
import { blogApi } from '@/apis'
import { EBlogRank } from '@/typings'
import { BlogKey } from '../constants'
import { FolderOpened, RefreshLeft } from '@element-plus/icons-vue'
import type { BlogSidebarProps } from '../types'
import type { BlogCategoryItem, BlogItem } from '@/apis/modules/blog/type'

const props = defineProps<BlogSidebarProps>()
const { loadingSkeleton, closeSkeleton } = useSkeleton()
const { getAuthorInfo } = useGlobalGetters()

// 分类列表
const categoryList = ref<BlogCategoryItem[]>([])
const getCategoryList = async () => {
	const resp = await blogApi.reqGetBlogCategoryList()
	categoryList.value = resp.data
	closeSkeleton()
}
getCategoryList()

const blogInject = inject(BlogKey, undefined)

// 点击事件
const categorylClick = (item: BlogCategoryItem) => {
	if (!item.blogNums) return ElMessage.warning('该分类下暂无文章')
	blogInject?.setCondition('categoryId', item.id)
}

// 热门 blog
const hotBlogList = ref<BlogItem[]>([])
const getHotBlogList = async () => {
	const resp = await blogApi.reqGetBlogRank({ type: EBlogRank.HOT })
	hotBlogList.value = resp.data
	closeSkeleton()
}
getHotBlogList()
</script>

<template>
	<div class="sidebar">
		<template v-if="!loadingSkeleton">
			<!-- author -->
			<div class="item-wrap">
				<div class="author-item">
					<div class="info">
						<p class="nickname">{{ getAuthorInfo?.nickname }}</p>
						<p class="sign">
							<span>
								{{ getAuthorInfo?.sign }}
							</span>
						</p>
						<p class="description">
							<span>
								{{ getAuthorInfo?.description }}
							</span>
						</p>
					</div>
					<div class="avatar">
						<img :src="getAuthorInfo?.avatarUrl" />
					</div>
				</div>
			</div>

			<!-- toc 分类 -->
			<div class="sticky">
				<div class="item-wrap">
					<div class="title">
						<span class="title-text">分类列表</span>
						<el-tooltip
							class="box-item"
							content="清除分类"
							placement="bottom">
							<el-icon
								@click="blogInject?.setCondition('categoryId', undefined)"
								:size="20"
								><RefreshLeft
							/></el-icon>
						</el-tooltip>
					</div>
					<div class="content">
						<div
							@click="categorylClick(item)"
							v-for="item in categoryList"
							:key="item.id"
							:class="{ active: props.categoryId === item.id }"
							class="item category-item">
							<el-icon :size="18"><FolderOpened /></el-icon>
							<div class="text">
								<span>{{ item.categoryName }}</span>
								<span v-if="item.blogNums">({{ item.blogNums }})</span>
							</div>
						</div>
					</div>
				</div>

				<!-- hot 文章 -->
				<div class="item-wrap">
					<div class="title">
						<span class="title-text">热门推荐</span>
					</div>
					<div class="content">
						<div
							class="item"
							v-for="item in hotBlogList"
							:key="item.id">
							<div class="text">
								<a
									:href="`/blog-detail/${item.id}`"
									target="_blank">
									<span>{{ item.title }}</span>
								</a>
							</div>
							<span class="count">{{ item.lookNums }}</span>
						</div>
					</div>
				</div>
			</div>
		</template>
		<!-- 骨架屏 -->
		<template v-else>
			<BlogSidebarItemSkeleton :loading="loadingSkeleton"></BlogSidebarItemSkeleton>
		</template>
	</div>
</template>

<style scoped lang="less">
.sidebar {
	flex-shrink: 0;
	width: 300px;
	margin-right: auto;
	@media (max-width: @size-md) {
		display: none;
	}
	.sticky {
		position: sticky;
		top: 20px;
	}
	.item-wrap {
		padding: 15px;
		height: auto;
		border-radius: var(--base-b-r);
		border: 1px solid var(--border-color);
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
		.author-item {
			display: flex;
			.avatar {
				margin-left: 5px;
				--size: 50px;
				width: var(--size);
				height: var(--size);
				border-radius: 50%;
				overflow: hidden;
				flex-shrink: 0;
				border: 1px solid var(--border-color);
				img {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			}
			.info {
				flex: 1;
				display: flex;
				flex-direction: column;
				gap: 5px;
				.nickname {
					font-size: 18px;
					font-weight: bold;
					color: var(--primary-color);
				}
				.sign {
					font-size: 16px;
					color: var(--el-text-color-regular);
				}
				.description {
					font-size: 14px;
					color: var(--el-text-color-placeholder);
					span {
						background: linear-gradient(
							to right,
							var(--el-color-primary-light-8),
							var(--el-color-primary-light-7),
							var(--el-color-primary-light-5)
						);
						background-size: 0 1px;
						background-repeat: no-repeat;
						// 设置默认为右，退出的时候位置就会靠右
						background-position: right bottom;
						// 只针对背景图的位置进行过渡
						transition: background-size 0.5s linear;
					}
					&:hover span {
						// 进入的时候位置为左
						background-position: left bottom;
						background-size: 100% 3px;
					}
				}
			}
		}
		.title {
			border-bottom: 1px solid var(--border-color);
			padding-bottom: 5px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.title-text {
				font-size: 18px;
				font-weight: bold;
				color: var(--el-text-color-primary);
			}
			:deep(.el-icon) {
				cursor: pointer;
				color: var(--el-text-color-regular);
			}
		}
		.content {
			width: 100%;
			margin-top: 10px;
			.item {
				width: 100%;
				display: inline-flex;
				font-size: 15px;
				line-height: 24px;
				color: var(--el-text-color-regular);
				&:hover {
					cursor: pointer;
					color: var(--primary-color);
				}
				&.category-item {
					&.active {
						color: var(--primary-color);
					}
					.text {
						line-height: 20px;
						margin: 0 5px 0 5px;
					}
				}
				.text {
					flex: 1;
					margin-right: 10px;
					.one-omit();
					a {
						text-decoration: none;
					}
				}
				.count {
					flex-shrink: 0;
					margin-left: auto;
					font-size: 13px;
					color: var(--el-text-color-placeholder);
				}
			}
		}
	}
}
</style>
