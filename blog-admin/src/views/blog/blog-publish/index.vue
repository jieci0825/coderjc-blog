<script setup lang="ts">
import Editor from '@/components/editor'
import publishFormFn from './config/publish-form.config'
import { reactive, ref } from 'vue'
import { FullScreen, Close, MessageBox, Position } from '@element-plus/icons-vue'
import { useEventListener } from '@/hooks'
import { blogApi, blogCategoryApi } from '@/apis'
import { useRefs } from '@/hooks/use-refs'
import { uploadFile } from '@/cos'
import { EBlogStatus } from '@/typings'
import type { CreateBlogParams } from '@/apis/modules/blog/type'
import type { BlogCategoryItem } from '@/apis/modules/blog-category/type'

defineOptions({ name: 'BlogPublish' })

const blogData: CreateBlogParams = reactive({
	title: '',
	previewUrl: '',
	description: '',
	htmlContent: '',
	mdContent: '',
	status: EBlogStatus.PUBLISH,
	tagIds: [],
	categoryId: 0
})

const size = 'large'
const isFull = ref(false)

const { refs, setRef } = useRefs()

useEventListener(window, 'keydown', e => {
	if (e.key === 'Escape') {
		isFull.value = false
	}
})

// 分类列表
const categoryList = ref<BlogCategoryItem[]>([])
const getCategoryList = async () => {
	const resp = await blogCategoryApi.reqGetBlogCategoryList()
	categoryList.value = resp.data
}
getCategoryList()

const visible = ref(false)
const publishFormConfig = ref({})
const openPublishDrawer = () => {
	publishFormConfig.value = publishFormFn(categoryList.value)
	visible.value = true
}

// 草稿
const handleDraft = async () => {
	await submitIntercept()
	blogData.status = EBlogStatus.DRAFT
	submitBlogData(blogData, '已保存至草稿箱')
}

// 发布
const handlePublish = async (data: CreateBlogParams) => {
	await submitIntercept()
	// 处理文件
	if (data.previewUrl && typeof data.previewUrl !== 'string') {
		const result = await uploadFile(data.previewUrl as unknown as File)
		data.previewUrl = result.url
	}
	const _blogData = Object.assign({}, blogData, data)
	await submitBlogData(_blogData, '成功发布博客')
	visible.value = false
}

// 提交博客数据
async function submitBlogData(blogData: CreateBlogParams, message: string) {
	blogData.htmlContent = refs.editorRef.getHtml()
	blogData.mdContent = refs.editorRef.getMarkdown()
	await blogApi.reqCreateBlog(blogData)
	ElMessage.success(message)
	reset()
}

// 重置
function reset() {
	blogData.title = ''
	blogData.htmlContent = ''
	blogData.status = EBlogStatus.PUBLISH
	blogData.tagIds = []
	blogData.categoryId = 0
	refs.editorRef.setHtml('')
}

// 提交拦截
function submitIntercept() {
	return new Promise<void>(resolve => {
		if (!blogData.title) {
			return ElMessage.warning('请输入博客标题')
		}
		if (refs.editorRef.getHtml() === '<p><br></p>') {
			return ElMessage.warning('请输入博客内容')
		}
		resolve()
	})
}
</script>

<template>
	<div :class="['blog-publish-container', 'container', isFull ? 'full' : '']">
		<div class="header">
			<el-input
				:size="size"
				v-model="blogData.title"
				placeholder="请输入博客标题..."
			></el-input>
			<el-icon
				@click="isFull = !isFull"
				:size="30"
				class="icon"
			>
				<FullScreen v-if="!isFull" />
				<Close v-else />
			</el-icon>
			<el-button
				@click="handleDraft"
				:size="size"
				style="margin-left: 20px"
			>
				<el-icon
					style="margin-right: 5px"
					:size="20"
				>
					<MessageBox />
				</el-icon>
				草稿箱</el-button
			>
			<el-button
				@click="openPublishDrawer"
				:size="size"
				type="primary"
			>
				<el-icon
					style="margin-right: 5px"
					:size="20"
				>
					<Position />
				</el-icon>
				发布</el-button
			>
		</div>
		<div class="content">
			<Editor
				:data="blogData.htmlContent"
				:ref="setRef('editorRef')"
			/>
		</div>

		<JcDrawer
			title="发布博客"
			v-model="visible"
		>
			<JcForm
				@submit="handlePublish"
				v-bind="publishFormConfig"
			>
				<template #tagHeader>
					<div style="font-size: 14px">搜索并选择需要添加的标签</div>
				</template>
			</JcForm>
		</JcDrawer>
	</div>
</template>

<style scoped lang="less">
.blog-publish-container {
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
	&.full {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9100;
	}
	.header {
		display: flex;
		align-items: center;
		margin-bottom: 15px;
		.icon {
			cursor: pointer;
			&:hover {
				color: var(--el-color-primary);
			}
		}
		:deep(.el-input__inner) {
			font-size: 30px;
			font-weight: 600;
			color: var(--el-text-color-primary);
		}
		:deep(.el-input__wrapper) {
			box-shadow: none;
		}
	}
	.content {
		border-radius: 4px;
		flex: 1;
		width: 100%;
	}
}
</style>
