import { createVNode, render } from 'vue'
import { ElImageViewer, ImageViewerProps } from 'element-plus'

type PreviewOption = Partial<ImageViewerProps>

export const previewImage = (option: PreviewOption) => {
	const container = document.createElement('div')
	const vm = createVNode(ElImageViewer, {
		...option,
		onClose() {
			// 销毁时移除节点
			render(null, container)
		}
	})

	render(vm, container)
	document.body.appendChild(container.firstElementChild!)
}
