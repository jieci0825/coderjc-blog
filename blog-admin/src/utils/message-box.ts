export const openDeleteMessageBox = (message: string = '你确定要执行此删除行为吗？') => {
	return new Promise<void>(resolve => {
		ElMessageBox.confirm(message, '删除提示', { type: 'warning' })
			.then(() => {
				resolve()
			})
			.catch(() => {})
	})
}
