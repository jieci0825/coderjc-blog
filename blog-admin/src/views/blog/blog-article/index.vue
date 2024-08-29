<script setup lang="ts">
import blogTableConfig from './config/blog-table.config'
import blogSearchFormConfig from './config/blog-search-form.config'
import blogFormFN from './config/blog-form.config'
import Editor from '@/components/editor'
import { blogApi, blogCategoryApi } from '@/apis'
import { ref } from 'vue'
import { useRefs } from '@/hooks/use-refs'
import { openDeleteMessageBox } from '@/utils'
import { EBlogStatus, type BlogStatus } from '@/typings'
import { uploadFile } from '@/cos'
import type { BlogItem } from '@/apis/modules/blog/type'
import type { BlogCategoryItem } from '@/apis/modules/blog-category/type'

const dialogVisable = ref(false)
const curBlogInfo = ref<BlogItem>()
const blogFormConfig = ref({})

// 分类列表
const categoryList = ref<BlogCategoryItem[]>([])
const getCategoryList = async () => {
	const resp = await blogCategoryApi.reqGetBlogCategoryList()
	categoryList.value = resp.data
}
getCategoryList()

const openEditBlogDialog = async (row: BlogItem) => {
	const resp = await blogApi.reqGetBlogDetail(row.id)
	blogFormConfig.value = blogFormFN(categoryList.value, resp.data.tags)
	curBlogInfo.value = row
	curBlogInfo.value!.htmlContent = resp.data.htmlContent
	curBlogInfo.value!.tagIds = resp.data.tags.map(item => item.id)
	dialogVisable.value = true
}

const handleTableDelete = async (row: BlogItem) => {
	await openDeleteMessageBox()
	const resp = await blogApi.reqDeleteBlog(row.id)
	ElMessage.success(resp.msg)
	refreshData()
}

const { refs, setRef } = useRefs()

const handleSubmit = async (data: BlogItem) => {
	// 处理文件
	if (data.previewUrl && typeof data.previewUrl !== 'string') {
		const result = await uploadFile(data.previewUrl as unknown as File)
		data.previewUrl = result.url
	}
	data.htmlContent = refs.editorRef.getHtml()
	const resp = await blogApi.reqEditBlog(data)
	ElMessage.success(resp.msg)
	dialogVisable.value = false
	refreshData()
}

function refreshData() {
	refs.blogPageContentRef?.fetchData()
}

const BlogStatusMap = {
	[EBlogStatus.DRAFT]: { label: '草稿', type: 'info' },
	[EBlogStatus.PUBLISH]: { label: '发布', type: 'success' },
	[EBlogStatus.HIDE]: { label: '隐藏', type: 'danger' }
}

const usePageContent = {
	request: blogApi.reqGetBlogList
}
</script>

<template>
	<div class="blog-article-contaianer container">
		<PageContent
			@handleTableEdit="openEditBlogDialog"
			@handleTableDelete="handleTableDelete"
			:ref="setRef('blogPageContentRef')"
			:is-action="false"
			:use-page-content="usePageContent"
			:form-config="blogSearchFormConfig"
			:tableConfig="blogTableConfig"
			:paginator-config="{}">
			<template #preview="{ row }">
				<JcImage
					:width="100"
					:height="60"
					:src="row.previewUrl" />
			</template>
			<template #tags="{ row }">
				<div
					class="tag-list"
					v-if="row.tags.length">
					<el-tag
						v-for="tag in row.tags"
						:key="tag.id"
						type="info"
						>{{ tag.tagName }}</el-tag
					>
				</div>
				<span v-else>暂无标签</span>
			</template>
			<template #status="{ row }">
				<el-tag :type="BlogStatusMap[row.status as BlogStatus].type">
					{{ BlogStatusMap[row.status as BlogStatus].label }}
				</el-tag>
			</template>
		</PageContent>

		<JcDialog
			v-model="dialogVisable"
			width="100%"
			title="编辑博客">
			<JcForm
				@submit="handleSubmit"
				v-model="curBlogInfo"
				v-bind="blogFormConfig">
				<template #htmlContent>
					<Editor
						v-if="curBlogInfo"
						:data="curBlogInfo.htmlContent"
						:ref="setRef('editorRef')" />
				</template>
			</JcForm>
		</JcDialog>
	</div>
</template>

<style scoped lang="less">
.blog-article-contaianer {
	width: 100%;
	.tag-list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	:deep(.el-dialog) {
		margin: 0;
		height: 100%;
		overflow: hidden auto;
	}
}
</style>
