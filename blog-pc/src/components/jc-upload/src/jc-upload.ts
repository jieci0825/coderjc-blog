import type { Component } from 'vue'
import type { UploadFile, UploadFiles } from 'element-plus'

export interface JcUploadConfig {
	oneStyle?: any
	oneIcon?: Component
	oneText?: string
	moreStyle?: any
	accept?: string
	oneTip?: string
	otherELConfig?: any
	fileSize?: number // 单位：b字节
	uploadFileVerify?: (uploadFile: UploadFile, uploadFiles: UploadFiles) => void
	initPreviewImage?: any
}

export interface JcUploadProps extends JcUploadConfig {
	model: 'one' | 'more'
}
