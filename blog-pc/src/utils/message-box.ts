import type { ElMessageBoxOptions } from 'element-plus'

export interface OpenMessageBoxOptions {
	title?: string
	type?: ElMessageBoxOptions['type']
	confirmButtonText?: string
	cancelButtonText?: string
	message?: string
}

export const openTipMessageBox = ({
	message = '你确定要执行此行为吗？',
	title = '提示',
	type = 'warning',
	confirmButtonText = '确定',
	cancelButtonText = '取消'
}: OpenMessageBoxOptions) => {
	return new Promise<void>(resolve => {
		ElMessageBox.confirm(message, title, { type, confirmButtonText, cancelButtonText })
			.then(() => {
				resolve()
			})
			.catch(() => {})
	})
}
