export interface CommentPublishProps {
	content?: string
	placeholder?: string
	maxWord?: number
	accept?: string
	fileSize?: number
	maxFileNums?: number
}

export interface CommentPublishEmits {
	(e: 'publish', content: string, fileList: FileItem[]): void
}

export interface FileItem {
	name: string
	type: string
	size: number
	raw: File | Blob
	url: string
	hash: string
}
