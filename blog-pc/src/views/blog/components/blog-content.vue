<script setup lang="ts">
import BlogContentItem from './blog-content-item.vue'
import BlogContentItemSkeleton from './blog-content-item-skeleton.vue'
import BlogContentItemXS from './blog-content-item-xs.vue'
import BlogContentItemXSSkeleton from './blog-content-item-xs-skeleton.vue'
import { Search } from '@element-plus/icons-vue'
import { inject } from 'vue'
import { BlogKey } from '../constants'
import type { BlogContentEmits, BlogContentProps } from '../types'

const props = defineProps<BlogContentProps>()
const emits = defineEmits<BlogContentEmits>()

const modleTitle = defineModel('title', { type: String })

const blogInject = inject(BlogKey, undefined)
</script>

<template>
	<div class="content-wrap">
		<div class="search-bar">
			<el-input
				@keyup.enter="blogInject?.setCondition('title', modleTitle!)"
				@clear="blogInject?.setCondition('title', '')"
				inputmode="search"
				v-model="modleTitle"
				size="large"
				spellcheck="false"
				clearable
				placeholder="输入要查询的标题并回车查询">
				<template #prefix>
					<el-icon :size="20"><Search /></el-icon> </template
			></el-input>
		</div>
		<div class="content">
			<template v-if="!props.loadingSkeleton">
				<template v-if="props.blogList.length">
					<BlogContentItem
						v-for="(item, index) in props.blogList"
						:key="index"
						:item-data="item"></BlogContentItem>
				</template>
				<template v-else>
					<el-empty description="你搜索的内容不存在"></el-empty>
				</template>
			</template>
			<template v-else>
				<BlogContentItemSkeleton
					v-for="item in 5"
					:key="item"
					:loading="props.loadingSkeleton"></BlogContentItemSkeleton>
			</template>
		</div>
		<div class="content-xs">
			<template v-if="!loadingSkeleton">
				<template v-if="props.blogList.length">
					<BlogContentItemXS
						v-for="(item, index) in props.blogList"
						:key="index"
						:item-data="item"></BlogContentItemXS>
				</template>
				<template v-else>
					<el-empty description="你搜索的内容不存在"></el-empty>
				</template>
			</template>
			<template v-else>
				<BlogContentItemXSSkeleton
					v-for="item in 5"
					:key="item"
					:loading="loadingSkeleton"></BlogContentItemXSSkeleton>
			</template>
		</div>
		<div class="footer">
			<div class="pagination">
				<el-pagination
					@current-change="($event:number)=>emits('onPage',$event)"
					@size-change="($event:number)=>emits('onPageSize',$event)"
					:page-sizes="[5, 10, 15, 20]"
					:total="props.total"
					layout="total, sizes, ->, prev, pager, next, jumper"
					size="small"
					background />
			</div>
			<div class="pagination-xs">
				<el-pagination
					@current-change="($event:number)=>emits('onPage',$event)"
					@size-change="($event:number)=>emits('onPageSize',$event)"
					:page-sizes="[5, 10, 15, 20]"
					:total="props.total"
					size="small"
					layout="total, prev, pager, next"
					background />
			</div>
		</div>
	</div>
</template>

<style scoped lang="less">
.content-wrap {
	align-self: flex-start;
	margin-left: auto;
	flex: 1;
	max-width: 720px;
	border-radius: var(--base-b-r);
	border: 1px solid var(--border-color);
	padding: 10px 20px;
	.search-bar {
		width: 100%;
		padding: 10px 0;
		margin-bottom: 10px;
		@media (max-width: @size-xs) {
			padding: 10px;
		}
		:deep(.el-input) {
			font-size: 16px;
		}
	}
	.content {
		width: 100%;
		@media (max-width: @size-xs) {
			display: none;
		}
	}
	@media (max-width: @size-md) {
		margin-right: auto;
	}
	@media (max-width: @size-xs) {
		padding: 0;
		border: none;
	}

	.content-xs {
		width: 100vw;
		display: none;
		@media (max-width: @size-xs) {
			display: block;
		}
	}

	.footer {
		padding-top: 10px;
		width: 100%;
		display: flex;
		align-items: center;
		.pagination-xs {
			display: none;
		}
		.pagination {
			width: 100%;
		}
		@media (max-width: @size-xs) {
			justify-content: center;
			.pagination {
				display: none;
			}
			.pagination-xs {
				display: block;
			}
		}
	}
}
</style>
