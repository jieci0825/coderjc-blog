<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import { Plus, Edit, Delete, ZoomIn } from '@element-plus/icons-vue'
import { genFileId } from 'element-plus'
import { convertBytes, previewImage } from '@/utils'
import { JcUploadKey } from './constants'
import type { UploadFile, UploadFiles, UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const jcUploadInject = inject(JcUploadKey, undefined)

// 图片预览数组
const previewImages = ref<string[]>([jcUploadInject?.initPreviewImage])
// 单文件上传组件实例
const oneUploadRef = ref<UploadInstance>()
// 单文件上传组件预览图
const onePreviewImage = ref((jcUploadInject?.initPreviewImage as string) || '')
// 替换上一个文件-保持单个文件上传
const handleExceed: UploadProps['onExceed'] = files => {
	oneUploadRef.value!.clearFiles()
	const file = files[0] as UploadRawFile
	file.uid = genFileId()
	oneUploadRef.value!.handleStart(file)
}

// 监听单文件变化
const onOneChange = (uploadFile: UploadFile, uploadFiles: UploadFiles) => {
	// 校验文件格式
	const types: string[] = []
	jcUploadInject?.accept!.split(',').forEach(item => {
		types.push(item.trim())
	})

	const curFileType = uploadFile.raw?.type!
	console.log('🚢 ~ 当前打印的内容 ~ curFileType:', curFileType)
	console.log(types)
	if (types && !types.includes(curFileType)) {
		ElMessage.error(`文件格式不正确，当前文件格式${curFileType}`)
		return
	}

	// 校验文件大小
	if (uploadFile.size! > jcUploadInject?.fileSize!) {
		ElMessage.error(`文件大小超过限制，当前文件大小${convertBytes(uploadFile.size!)}`)
		return
	}

	// 为图片文件时读取文件数据，转为本地预览图
	if (curFileType.includes('image')) {
		const reader = new FileReader()
		reader.onload = res => {
			if (res?.target?.result) {
				const dataUrl = res.target.result as string
				onePreviewImage.value = dataUrl
				previewImages.value = [dataUrl]
			}
		}
		reader.readAsDataURL(uploadFile.raw!)
	}
	// 为音频文件时，使用特定的预览图
	else if (curFileType.includes('audio')) {
		const audioPreview = `https://cos.coderjc.cn/my-resource/file-icon/audio.png`
		onePreviewImage.value = audioPreview
		previewImages.value = [audioPreview]
	}

	jcUploadInject?.setModelValue(uploadFile.raw!)

	jcUploadInject?.uploadFileVerify && jcUploadInject.uploadFileVerify(uploadFile, uploadFiles)
}
// 单文件编辑方法
const handleOneEdit = () => {
	const container = oneUploadRef.value?.$el
	container && container.querySelector('.el-upload__input')?.click()
}
// 单文件删除方法
const handleOneDelete = () => {
	onePreviewImage.value = ''
	jcUploadInject?.setModelValue(null)
}
// 单文件预览方法
const handleOnePreview = () => {
	previewImage({ initialIndex: 0, urlList: previewImages.value })
}

const oneTip = computed(() => {
	return jcUploadInject?.oneTip || `建议上传 ${convertBytes(jcUploadInject?.fileSize!)} 大小的文件`
})
</script>

<template>
	<div
		v-if="jcUploadInject?.model === 'one'"
		class="one-upload-wrapper">
		<div
			:style="jcUploadInject?.oneStyle"
			class="one-upload">
			<el-upload
				v-bind="jcUploadInject?.otherELConfig"
				:show-file-list="false"
				:limit="1"
				:accept="jcUploadInject?.accept"
				:on-change="onOneChange"
				:on-exceed="handleExceed"
				:auto-upload="false"
				ref="oneUploadRef"
				action="#">
				<el-icon :size="25"><Plus /></el-icon>
			</el-upload>

			<!-- 预览 -->
			<div
				v-if="onePreviewImage"
				class="preview-box">
				<div class="mask">
					<div class="actions">
						<div
							@click="handleOneEdit"
							class="action-item">
							<el-icon :size="18">
								<Edit />
							</el-icon>
							<span>编辑</span>
						</div>
						<div
							@click="handleOnePreview"
							class="action-item">
							<el-icon :size="18">
								<ZoomIn />
							</el-icon>
							<span>预览</span>
						</div>
						<div
							@click="handleOneDelete"
							class="action-item">
							<el-icon :size="18">
								<Delete />
							</el-icon>
							<span>删除</span>
						</div>
					</div>
				</div>
				<img
					:src="onePreviewImage"
					alt="加载失败" />
			</div>
		</div>
		<div class="tip-box">
			<span>{{ oneTip }}</span>
		</div>
	</div>
</template>

<style lang="less" scoped>
.one-upload-wrapper {
	.one-upload {
		width: 140px;
		height: 140px;
		border: 2px dashed var(--text-color);
		border-radius: 6px;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.25s;
		position: relative;
		&:hover {
			cursor: pointer;
			border-color: var(--primary-color);
		}
		& > div {
			width: 100%;
			height: 100%;
		}
		:deep(.el-upload) {
			width: 100%;
			height: 100%;
		}
		.preview-box {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			border-radius: 6px;
			overflow: hidden;
			display: flex;
			align-items: center;
			justify-content: center;
			.mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgba(0, 0, 0, 0.3);
				opacity: 0;
				transition: opacity 0.25s;
				.actions {
					width: 100%;
					height: 100%;
					display: flex;
					align-items: center;
					justify-content: center;
					gap: 5px;
					.action-item {
						display: flex;
						flex-direction: column;
						align-items: center;
						cursor: pointer;
						color: #fff;
						transition: color 0.25s;
						&:hover {
							color: var(--primary-color);
						}
						span {
							font-size: 14px;
						}
					}
				}
			}
			&:hover .mask {
				opacity: 1;
			}
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}
	}
	.tip-box {
		color: var(--text-color);
	}
}
</style>
