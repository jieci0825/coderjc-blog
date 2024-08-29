<script setup lang="ts">
import SparkMD5 from 'spark-md5'
import { useEventListener, useRefs } from '@/hooks'
import { nextTick, onMounted, Ref, ref } from 'vue'
import { EmojiList } from './emoji'
import { compressor, convertBytes, previewImage } from '@/utils'
import type { FileItem, CommentPublishEmits, CommentPublishProps } from './comment-publish'

defineOptions({ name: 'CommentPublish' })

const props = withDefaults(defineProps<CommentPublishProps>(), {
	content: '',
	placeholder: '海内存知己，天涯若比邻',
	maxWord: 1000,
	accept: 'image/jpeg, image/png, image/webp, image/jpg, image/gif',
	fileSize: 1024 * 1024 * 30,
	maxFileNums: 3
})
const emits = defineEmits<CommentPublishEmits>()

const isFocus = ref(false) // 是否处于焦点状态
const commentContent = ref(props.content || '') // 输入内容

const handleFocus = () => {
	isFocus.value = true
}

const handleBlur = () => {
	isFocus.value = false
}

const { refs, setRef } = useRefs()

useEventListener(window, 'click', (e: MouseEvent) => {
	const target = e.target as HTMLElement
	if (refs.emojiRef === target) return
	isShowEmojiPanel.value = false
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)
onMounted(() => {
	textareaRef.value = refs.textareaRef?.$el.querySelector('textarea')
})

const isShowEmojiPanel = ref(false)
const openEmojiPanel = () => {
	isShowEmojiPanel.value = true
	textareaRef.value?.focus()
}

const slectEmoji = (emoji: string) => {
	const tBox = textareaRef.value as HTMLTextAreaElement
	const cursorPosition = tBox.selectionStart
	const newValue = commentContent.value.slice(0, cursorPosition) + emoji + commentContent.value.slice(cursorPosition)
	commentContent.value = newValue
	nextTick(() => {
		tBox.focus()
		tBox.setSelectionRange(cursorPosition + 2, cursorPosition + 2)
	})
}

const fileList = ref<FileItem[]>([])
const fileInputRef = ref<HTMLInputElement | null>()

const selectImage = () => {
	if (fileList.value.length >= props.maxFileNums) return ElMessage.warning(`最多上传${props.maxFileNums}张图片`)
	fileInputRef.value?.click()
}

useEventListener(fileInputRef as Ref<HTMLElement>, 'change', async (e: Event) => {
	const target = e.target as HTMLInputElement
	if (!target.files) return
	const file = target.files[0]
	try {
		const result = await processFileData(file)
		const verifyResult = fileVerify(result)
		if (verifyResult) return ElMessage.warning(verifyResult)
		fileList.value.push(result)
	} catch (error) {
		console.log(error)
	}
})

function fileVerify(result: FileItem): undefined | string {
	const isExist = fileList.value.some(item => item.hash === result.hash)
	if (isExist) {
		return '该图片已存在'
	}
	const types = props.accept.split(',').map(item => item.trim())
	if (types && !types.includes(result.type)) {
		return `文件格式不正确，当前文件格式${result.type}`
	}
	if (result.size! > props.fileSize!) {
		return `文件大小超过${convertBytes(props.fileSize)}，当前文件大小${convertBytes(result.size)}`
	}
}

async function processFileData(file: File): Promise<FileItem> {
	const fileData = await compressor(file)
	const data = await getImageDataUrl(fileData[0])
	return {
		name: file.name,
		size: file.size,
		type: file.type,
		raw: fileData[0],
		url: data.dataUrl,
		hash: data.hash
	}
}

function getImageDataUrl(file: File | Blob) {
	return new Promise<{ dataUrl: string; hash: string }>(resolve => {
		const reader = new FileReader()
		reader.onload = res => {
			if (res?.target?.result) {
				const dataUrl = res.target.result as string
				const hash = SparkMD5.hash(dataUrl)
				resolve({ dataUrl, hash })
			}
		}
		reader.readAsDataURL(file)
	})
}

const handlePublish = async () => {
	emits('publish', commentContent.value, fileList.value)
	handleClear()
}

function handleClear() {
	commentContent.value = ''
	fileList.value = []
}

const openImagePreview = (index: number) => {
	const previewList = fileList.value.map(item => item.url)
	previewImage({ initialIndex: index, urlList: previewList })
}

defineExpose({
	clear: handleClear
})
</script>

<template>
	<div :class="['comment-publish-wrap', isFocus || !!commentContent ? 'focused' : '']">
		<el-input
			@focus="handleFocus"
			@blur="handleBlur"
			v-model="commentContent"
			:ref="setRef('textareaRef')"
			:placeholder="props.placeholder"
			:autosize="false"
			type="textarea"
			class="edit-area"
			spellcheck="false">
		</el-input>
		<div
			class="preview-image-area"
			v-if="fileList.length">
			<div
				@click="openImagePreview(index)"
				v-for="(file, index) in fileList"
				:key="file.hash"
				class="image-item">
				<div
					class="close-btn"
					@click.stop="fileList.splice(index, 1)">
					<span class="iconfont icon-close-small"></span>
				</div>
				<img :src="file.url" />
			</div>
		</div>
		<div class="footer-area">
			<div class="actions">
				<div class="action emoji">
					<span
						@click="openEmojiPanel"
						:ref="setRef('emojiRef')"
						class="iconfont icon-smile"></span>
					<div
						class="emoji-wrap"
						v-show="isShowEmojiPanel">
						<div class="emoji-list">
							<div
								v-for="(emoji, index) in EmojiList"
								:key="index"
								class="emoji-item-wrap">
								<div
									:ref="setRef('emojiItemRef')"
									@click="slectEmoji(emoji)"
									class="emoji-item">
									{{ emoji }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="action">
					<span
						@click="selectImage"
						class="iconfont icon-picture"></span>
				</div>
			</div>
			<div class="show-word">
				<span class="word-count">{{ commentContent?.length || 0 }}</span>
				<span class="word-limit">/{{ props.maxWord }}</span>
			</div>
			<div class="submit">
				<el-button
					type="primary"
					@click="handlePublish"
					>发布</el-button
				>
			</div>
		</div>

		<!-- input file -->
		<input
			:accept="props.accept"
			ref="fileInputRef"
			class="file-inp"
			style="display: none"
			type="file" />
	</div>
</template>

<style scoped lang="less">
.comment-publish-wrap {
	width: 100%;
	background-color: var(--bg-color-1);
	transition: border-color 0.5s;
	border-radius: var(--base-b-r);
	border: 1px solid transparent;
	&.focused {
		border-color: var(--primary-color);
	}
	.edit-area {
		width: 100%;
		background-color: transparent;
		transition: height 0.3s;
		padding: 8px 12px;
		font-size: 16px;
		line-height: 1.5rem;
		border: none;
		outline: none;
		color: var(--el-text-color-primary);
		font-weight: 500;
		&::placeholder {
			color: var(--el-text-color-placeholder);
		}
		:deep(textarea) {
			height: 100%;
			resize: none;
			overflow: auto;
			box-shadow: none;
			background-color: transparent;
			padding: 0;
			&:hover {
				box-shadow: none;
			}
			&:focus {
				box-shadow: none;
			}
			&::-webkit-scrollbar {
				width: 0;
			}
		}
	}
	.preview-image-area {
		width: 100%;
		padding: 12px 12px 0 12px;
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.image-item {
			width: 65px;
			height: 65px;
			background-color: var(--bg-color);
			border-radius: var(--base-b-r);
			margin: 0 10px 10px 0;
			overflow: hidden;
			position: relative;
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			.close-btn {
				position: absolute;
				top: 3px;
				right: 3px;
				border-radius: 50%;
				background-color: var(--mask-color-1);
				padding: 2px;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: background-color 0.3s;
				&:hover {
					background-color: var(--mask-color-1-hover);
				}
				.iconfont {
					font-size: 14px;
				}
			}
		}
	}
	.footer-area {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 12px;
		.actions {
			display: flex;
			align-items: center;
			gap: 20px;
			@media (max-width: @size-xs) {
				gap: 10px;
			}
			.action {
				cursor: pointer;
				&:hover {
					.iconfont {
						color: var(--primary-color);
					}
				}
				&.emoji {
					position: relative;
					.emoji-wrap {
						user-select: none;
						position: absolute;
						z-index: 1000;
						top: calc(100% + 7px);
						left: -12px;
						width: 380px;
						height: 244px;
						border-radius: var(--base-b-r);
						filter: var(--filter-shadow);
						background-color: var(--bg-color);
						padding: 12px 0 12px 12px;
						&::before {
							content: '';
							position: absolute;
							background-color: inherit;
							z-index: -1;
							top: -6px;
							left: 15px;
							width: 15px;
							height: 15px;
							transform: rotate(45deg);
							border-radius: 2px;
						}
						.emoji-list {
							width: 100%;
							height: 100%;
							display: flex;
							flex-wrap: wrap;
							overflow: hidden auto;
							.emoji-item-wrap {
								overflow-y: auto;
								margin: 0 12px 8px 0;
								.emoji-item {
									width: 32px;
									height: 32px;
									line-height: 32px;
									text-align: center;
									font-size: 25px;
									overflow: hidden;
								}
							}
						}
					}
				}
				.iconfont {
					font-size: 24px;
					color: var(--el-text-color-secondary);
				}
			}
		}
		.show-word {
			color: var(--text-placeholder-color);
			margin-left: auto;
		}
		.submit {
			margin-left: 20px;
			@media (max-width: @size-xs) {
				margin-left: 10px;
			}
		}
	}
	.emoji-wrap {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
}
</style>
